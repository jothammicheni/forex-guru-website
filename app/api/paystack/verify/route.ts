// app/api/paystack/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

function convertToDummyUUID(planId: number | string): string {
  const num = typeof planId === 'string' ? parseInt(planId, 10) : planId;
  const padded = String(num).padStart(12, '0');
  return `00000000-0000-0000-0000-${padded}`;
}

function isNumericPlanId(planId: any): boolean {
  if (typeof planId === 'number') return true;
  if (typeof planId === 'string' && /^\d+$/.test(planId)) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    console.log('Verifying payment:', reference);

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { 'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}` },
    });

    const data = await response.json();

    if (!data.status || data.data.status !== 'success') {
      console.error('Payment verification failed:', data);
      
      await supabase
        .from('payments')
        .update({ 
          status: 'FAILED', 
          updated_at: new Date().toISOString() 
        })
        .eq('api_ref', reference);
      
      return NextResponse.json({ success: false, error: 'Payment verification failed' });
    }

    const planId = data.data.metadata?.plan_id;
    const amount = data.data.amount / 100;
    const customerEmail = data.data.customer?.email;
    
    let mpesaReference = null;
    if (data.data.channel === 'mobile_money') {
      mpesaReference = data.data.receipt_number;
    }

    let planIdToStore = planId;
    if (planId && isNumericPlanId(planId)) {
      planIdToStore = convertToDummyUUID(planId);
    }

    const updateData: any = {
      status: 'COMPLETED',
      net_amount: amount,
      customer_email: customerEmail,
      updated_at: new Date().toISOString(),
    };

    if (planIdToStore) updateData.plan_id = planIdToStore;
    if (mpesaReference) updateData.mpesa_reference = mpesaReference;

    const { error: updateError } = await supabase
      .from('payments')
      .update(updateData)
      .eq('api_ref', reference);

    if (updateError) {
      console.error('Failed to update payment:', updateError);
      return NextResponse.json({ success: false, error: 'Failed to update payment' });
    }

    return NextResponse.json({
      success: true,
      plan_id: planId,
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ success: false, error: 'Verification failed' });
  }
}