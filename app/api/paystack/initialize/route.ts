import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const CLIENT_ID = process.env.CLIENT_ID || 'architect_catalogue_website_1';

// Helper function to convert integer to dummy UUID format
function convertToDummyUUID(planId: number | string): string {
  const num = typeof planId === 'string' ? parseInt(planId, 10) : planId;
  const padded = String(num).padStart(12, '0');
  return `00000000-0000-0000-0000-${padded}`;
}

// Helper function to check if plan_id is a number (needs UUID conversion)
function isNumericPlanId(planId: any): boolean {
  if (typeof planId === 'number') return true;
  if (typeof planId === 'string' && /^\d+$/.test(planId)) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { planId, planTitle, planNumber, amount, email, phoneNumber, paymentMethod } = await request.json();

    // Generate unique reference
    const reference = `PLAN_${planId}_${Date.now()}`;

    // Convert planId to proper format for database
    let planIdToStore;
    if (isNumericPlanId(planId)) {
      // Numeric ID - convert to dummy UUID
      planIdToStore = convertToDummyUUID(planId);
      console.log(`Converting numeric planId ${planId} to dummy UUID: ${planIdToStore}`);
    } else {
      // Already a real UUID - use as-is
      planIdToStore = planId;
      console.log(`Using real UUID planId: ${planIdToStore}`);
    }

    // Create a PENDING payment record FIRST
    const { error: insertError } = await supabase
      .from('payments')
      .insert({
        client_id: CLIENT_ID,
        api_ref: reference,
        plan_id: planIdToStore,
        plan_title: planTitle,
        plan_number: planNumber, // ADDED: Include plan_number
        amount: amount,
        currency: 'KES',
        phone_number: phoneNumber,
        customer_email: email,
        status: 'PENDING',
        provider: 'Paystack',
        provider_ref: reference,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Failed to create payment record:', insertError);
      return NextResponse.json({ success: false, error: 'Failed to create payment record' }, { status: 500 });
    }

    // Initialize Paystack transaction
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email || `${planId}@customer.com`,
        amount: Math.round(amount * 100),
        currency: 'KES',
        reference: reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
        metadata: {
          plan_id: planId, // Keep original format in metadata
          plan_title: planTitle,
          plan_number: planNumber, // ADDED: Include plan_number in metadata for webhook
          phone: phoneNumber,
        },
        channels: paymentMethod === 'mpesa' ? ['mobile_money'] : ['card'],
      }),
    });

    const data = await response.json();

    if (!data.status) {
      await supabase
        .from('payments')
        .update({ status: 'FAILED', updated_at: new Date().toISOString() })
        .eq('api_ref', reference);
      
      return NextResponse.json({ success: false, error: data.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      authorization_url: data.data.authorization_url,
      reference: reference,
    });
    
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json({ success: false, error: 'Payment initialization failed' }, { status: 500 });
  }
}