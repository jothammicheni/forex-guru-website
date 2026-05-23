'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, Download, Infinity } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error'>('saving');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    if (!reference) {
      router.push('/');
      return;
    }

    // Get payment details from localStorage (set during checkout)
    const savedPlan = localStorage.getItem('current_payment_plan');
    const currentUser = localStorage.getItem('current_user');
    const paymentMethod = localStorage.getItem('current_payment_method');
    
    if (savedPlan && currentUser) {
      const plan = JSON.parse(savedPlan);
      const user = JSON.parse(currentUser);
      
      // Create subscription record with LIFETIME access (no expiry)
      const subscription = {
        id: `sub_${Date.now()}`,
        userId: user.id || user.email,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        planId: plan.id,
        planName: plan.name,
        planPrice: plan.price,
        planDuration: 'Lifetime',
        planDescription: plan.description,
        planFeatures: plan.features,
        amountKES: plan.amountKES,
        paymentMethod: paymentMethod || 'Unknown',
        paymentRef: reference,
        status: 'active',
        type: 'lifetime',
        purchasedAt: new Date().toISOString(),
        expiresAt: null, // No expiry for lifetime subscription
        neverExpires: true
      };
      
      // Save to localStorage subscriptions
      const existingSubscriptions = JSON.parse(localStorage.getItem('user_subscriptions') || '[]');
      // Check if already exists
      const exists = existingSubscriptions.some((sub: any) => sub.planId === plan.id && sub.userId === user.id);
      
      if (!exists) {
        existingSubscriptions.push(subscription);
        localStorage.setItem('user_subscriptions', JSON.stringify(existingSubscriptions));
        
        // Also save to user's active plans (lifetime)
        const userPlans = JSON.parse(localStorage.getItem(`user_plans_${user.id || user.email}`) || '[]');
        userPlans.push({
          planId: plan.id,
          planName: plan.name,
          planPrice: plan.price,
          planDuration: 'Lifetime',
          purchasedAt: new Date().toISOString(),
          expiresAt: null,
          paymentRef: reference,
          type: 'lifetime'
        });
        localStorage.setItem(`user_plans_${user.id || user.email}`, JSON.stringify(userPlans));
        
        // Also store as active subscription for quick access
        localStorage.setItem(`active_subscription_${user.id || user.email}`, JSON.stringify(subscription));
      }
      
      setPaymentDetails({ subscription, user, plan });
      setSaveStatus('saved');
      
      // Clear temporary payment data
      localStorage.removeItem('current_payment_ref');
      localStorage.removeItem('current_payment_plan');
      localStorage.removeItem('current_payment_method');
      
      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
    } else {
      setSaveStatus('error');
    }
  }, [reference, router]);

  if (saveStatus === 'saving') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase! You now have <span className="text-primary font-bold">Lifetime Access</span> to your membership.
          </p>

          {paymentDetails && (
            <div className="bg-secondary border border-border rounded-lg p-6 mb-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Order Summary</h3>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  <Infinity size={12} />
                  <span>Lifetime</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="text-foreground font-semibold">{paymentDetails.plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access Type:</span>
                  <span className="text-primary font-semibold">Lifetime Access (Never Expires)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="text-primary font-bold">KES {paymentDetails.plan.amountKES.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="text-foreground">{paymentDetails.subscription.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Card'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Reference:</span>
                  <span className="text-foreground text-sm">{reference}</span>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Valid Until:</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <Infinity size={14} />
                      Never Expires
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Purchased on: {new Date(paymentDetails.subscription.purchasedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold text-foreground mb-4">✨ What you get with Lifetime Access:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ 🎓 Full access to all course materials</li>
              <li>✓ 📚 Lifetime updates to all content</li>
              <li>✓ 💬 Access to private community</li>
              <li>✓ 🎥 Recorded webinar access</li>
              <li>✓ 📝 Strategy guides and resources</li>
              <li>✓ 🔄 Free access to new content added in the future</li>
            </ul>
          </div>

          <div className="bg-secondary border border-border rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold text-foreground mb-4">What happens next?</h3>
            <ol className="space-y-3 text-muted-foreground">
              <li>1. 📧 Check your email for login credentials and access instructions</li>
              <li>2. 🔐 Log in to access your member dashboard</li>
              <li>3. 📚 Start learning with our comprehensive video library</li>
              <li>4. 💬 Join our private Telegram community using the link in your email</li>
              <li>5. 🎯 Begin your journey to becoming a profitable trader</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/my-plans"
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent transition text-center"
            >
              View My Lifetime Plans
            </Link>
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-secondary border border-primary text-foreground rounded-lg font-bold hover:bg-primary/10 transition text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}