'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

function FailedContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment Failed
        </h1>
        <p className="text-muted-foreground mb-6">
          Your payment could not be processed. Please try again.
        </p>

        {reference && (
          <p className="text-xs text-muted-foreground mb-4">
            Reference: {reference}
          </p>
        )}

        <div className="space-y-3">
          <Link href="/checkout">
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent transition">
              <RefreshCw className="h-4 w-4 inline mr-2" />
              Try Again
            </button>
          </Link>
          
          <Link href="/">
            <button className="w-full py-3 bg-secondary border border-primary text-foreground rounded-lg font-bold hover:bg-primary/10 transition">
              <ArrowLeft className="h-4 w-4 inline mr-2" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <FailedContent />
    </Suspense>
  );
}