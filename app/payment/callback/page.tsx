// app/payment/callback/page.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');

  useEffect(() => {
    const paymentRef = reference || trxref;
    
    console.log('📞 Callback page - Reference:', paymentRef);
    
    if (!paymentRef) {
      console.log('❌ No payment reference found');
      router.push('/payment/failed?error=missing_reference');
      return;
    }

    const verifyPayment = async () => {
      try {
        // First check our database
        const checkUrl = `/api/payment/check?reference=${encodeURIComponent(paymentRef)}`;
        console.log('🔍 Checking payment at:', checkUrl);
        
        const response = await fetch(checkUrl);
        const data = await response.json();
        
        console.log('📦 Database check response:', data);
        
        if (data.exists && data.status === 'COMPLETED') {
          console.log('✅ Payment found in database! Redirecting to success...');
          router.push(`/payment/success?reference=${paymentRef}&plan_id=${data.plan_id}`);
          return;
        }
        
        if (data.exists && data.status === 'PENDING') {
          console.log('⏳ Payment still pending, waiting...');
          setTimeout(verifyPayment, 2000);
          return;
        }
        
        // If not in database, verify with Paystack
        console.log('🔄 Payment not in database, verifying with Paystack...');
        const verifyResponse = await fetch('/api/paystack/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: paymentRef }),
        });
        
        const verifyData = await verifyResponse.json();
        console.log('📦 Paystack verify response:', verifyData);
        
        if (verifyData.success) {
          router.push(`/payment/success?reference=${paymentRef}&plan_id=${verifyData.plan_id}`);
        } else {
          console.log('❌ Verification failed');
          router.push(`/payment/failed?reference=${paymentRef}`);
        }
        
      } catch (error) {
        console.error('❌ Error verifying payment:', error);
        router.push(`/payment/failed?reference=${paymentRef}`);
      }
    };
    
    // Start verification after 1 second
    setTimeout(verifyPayment, 1000);
    
  }, [reference, trxref, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Verifying your payment...</p>
        <p className="text-xs text-muted-foreground mt-2">Please wait</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}