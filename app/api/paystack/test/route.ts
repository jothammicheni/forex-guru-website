// app/api/paystack/test/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  console.log('Testing Paystack keys...');
  console.log('Secret key exists:', !!secretKey);
  console.log('Secret key prefix:', secretKey?.substring(0, 15));
  
  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        amount: 10000, // 100 KES
        currency: 'KES',
      }),
    });
    
    const data = await response.json();
    
    return NextResponse.json({
      status: response.status,
      success: data.status,
      message: data.message,
      data: data.data ? { reference: data.data.reference } : null,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
}