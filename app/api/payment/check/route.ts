// app/api/payment/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get('reference');

    console.log('🔍 Payment check - Reference:', reference);

    if (!reference) {
      return NextResponse.json({ exists: false, error: 'No reference provided' });
    }

    // Query the payments table by api_ref
    const { data, error } = await supabase
      .from('payments')
      .select('status, plan_id, plan_title, net_amount')
      .eq('api_ref', reference)
      .maybeSingle();  // Use maybeSingle() instead of single() to avoid 406 error

    if (error) {
      console.error('❌ Payment check error:', error);
      return NextResponse.json({ exists: false, error: error.message });
    }

    if (!data) {
      console.log('❌ No payment found for reference:', reference);
      return NextResponse.json({ exists: false });
    }

    console.log('✅ Payment found:', { 
      status: data.status, 
      plan_id: data.plan_id,
      plan_title: data.plan_title 
    });

    // Convert UUID to integer if it's a dummy UUID
    let planId = data.plan_id;
    if (planId && typeof planId === 'string' && planId.startsWith('00000000-0000-0000-0000-')) {
      const match = planId.match(/\d+$/);
      if (match) {
        planId = parseInt(match[0], 10);
      }
    }

    return NextResponse.json({
      exists: true,
      status: data.status,
      plan_id: planId,
      plan_title: data.plan_title,
      amount: data.net_amount
    });
    
  } catch (error) {
    console.error('❌ Check payment error:', error);
    return NextResponse.json({ exists: false, error: 'Internal error' });
  }
}