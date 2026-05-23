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

// Helper function to check if plan_id is numeric and needs conversion
function isNumericPlanId(planId: any): boolean {
  if (typeof planId === 'number') return true;
  if (typeof planId === 'string' && /^\d+$/.test(planId)) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    console.log('📦 Paystack Webhook Received');

    // Verify signature
    if (signature && PAYSTACK_SECRET_KEY) {
      const crypto = require('crypto');
      const hash = crypto
        .createHmac('sha512', PAYSTACK_SECRET_KEY)
        .update(rawBody)
        .digest('hex');
      
      if (hash !== signature) {
        console.error('❌ Invalid webhook signature');
        // Still process but log error
      } else {
        console.log('✅ Signature verified');
      }
    } else {
      console.log('⚠️ No signature verification');
    }

    const payload = JSON.parse(rawBody);
    console.log('Webhook Event:', payload.event);

    const { event, data } = payload;

    if (event === 'charge.success') {
      const reference = data.reference;
      const amount = data.amount / 100;
      const planId = data.metadata?.plan_id;
      const planTitle = data.metadata?.plan_title;
      const planNumber = data.metadata?.plan_number; // ADDED: Get plan_number from metadata
      const phoneNumber = data.metadata?.phone;
      const customerEmail = data.customer?.email;
      const customerName = `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`.trim();
      
      // Extract M-PESA reference - this is the transaction code
      let mpesaReference = null;
      if (data.channel === 'mobile_money') {
        mpesaReference = data.receipt_number || data.mobile_money?.receipt_number || data.mobile_money?.transaction_id;
        if (mpesaReference) {
          console.log('💰 M-PESA Reference captured:', mpesaReference);
        }
      }

      console.log('✅ Payment successful!');
      console.log('Reference:', reference);
      console.log('Plan ID from metadata:', planId);
      console.log('Plan Number from metadata:', planNumber); // ADDED: Log plan_number
      console.log('M-PESA Reference:', mpesaReference);

      // Determine plan_id format for database
      let planIdToStore = planId;
      if (planId && isNumericPlanId(planId)) {
        planIdToStore = convertToDummyUUID(planId);
        console.log('Converting numeric planId to dummy UUID:', planIdToStore);
      }

      // Check if payment already exists
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('id, status')
        .eq('api_ref', reference)
        .single();

      if (existingPayment) {
        // Update existing payment - ONLY columns that exist in your schema
        const updateData: any = {
          status: 'COMPLETED',
          net_amount: amount,
          customer_email: customerEmail,
          customer_name: customerName,
          phone_number: phoneNumber,
          provider_ref: reference,
          updated_at: new Date().toISOString(),
        };
        
        if (planIdToStore) {
          updateData.plan_id = planIdToStore;
        }
        
        if (planNumber) { // ADDED: Include plan_number in update
          updateData.plan_number = planNumber;
        }
        
        if (mpesaReference) {
          updateData.mpesa_reference = mpesaReference;
          updateData.provider = 'M-PESA'; // Set provider to M-PESA for mobile money
        } else if (data.channel === 'card') {
          updateData.provider = 'Card';
        }
        
        const { error: updateError } = await supabase
          .from('payments')
          .update(updateData)
          .eq('api_ref', reference);

        if (updateError) {
          console.error('❌ Failed to update payment:', updateError);
          return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
        }
        console.log('✅ Payment updated to COMPLETED');
      } else {
        // Create new payment record - ONLY columns that exist in your schema
        const insertData: any = {
          client_id: CLIENT_ID,
          api_ref: reference,
          plan_title: planTitle,
          amount: amount,
          net_amount: amount,
          currency: 'KES',
          phone_number: phoneNumber,
          customer_email: customerEmail,
          customer_name: customerName,
          status: 'COMPLETED',
          provider_ref: reference,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        if (planIdToStore) {
          insertData.plan_id = planIdToStore;
        }
        
        if (planNumber) { // ADDED: Include plan_number in insert
          insertData.plan_number = planNumber;
        }
        
        if (mpesaReference) {
          insertData.mpesa_reference = mpesaReference;
          insertData.provider = 'M-PESA';
        } else if (data.channel === 'card') {
          insertData.provider = 'Card';
        } else {
          insertData.provider = 'Paystack';
        }

        const { error: insertError } = await supabase
          .from('payments')
          .insert(insertData);

        if (insertError) {
          console.error('❌ Failed to create payment:', insertError);
          return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
        }
        console.log('✅ New payment created with M-PESA ref:', mpesaReference);
        if (planNumber) {
          console.log('✅ Plan number saved:', planNumber);
        }
      }
    }

    // Handle charge failed
    if (event === 'charge.failed') {
      const reference = data.reference;
      console.log('❌ Payment failed:', reference);
      
      await supabase
        .from('payments')
        .update({
          status: 'FAILED',
          updated_at: new Date().toISOString(),
        })
        .eq('api_ref', reference);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Paystack webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}