// app/api/paystack/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reference = searchParams.get('reference');
  
  if (reference) {
    // Redirect to success page with reference
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?reference=${reference}`
    );
  }
  
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`);
}