'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCart, clearCart } from '@/lib/cart';
import { getCurrentUser } from '@/lib/auth';
import { ArrowLeft, CreditCard, Smartphone, Lock, Phone, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const [cart, setCart] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa' | null>(null);
  const [showCryptoInfo, setShowCryptoInfo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }

    setUser(currentUser);
    const currentCart = getCart();
    if (currentCart.items.length === 0) {
      router.push('/cart');
      return;
    }
    setCart(currentCart);
    setLoading(false);
  }, [router]);

  const initializePayment = async (method: 'card' | 'mpesa') => {
    setProcessing(true);
    setPaymentMethod(method);
    
    // Store payment method for success page
    localStorage.setItem('current_payment_method', method);
    
    // Get the first item in cart (assuming single plan purchase)
    const item = cart.items[0];
    const plan = item.plan;
    
    // Calculate amount in KES (assuming 1 USD = 129 KES)
    const amountKES = plan.price * 129;
    
    const payload = {
      planId: plan.id,
      planTitle: plan.name,
      planNumber: plan.id,
      amount: amountKES,
      email: user.email,
      phoneNumber: user.phone,
      paymentMethod: method
    };
    
    try {
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (data.success && data.authorization_url) {
        // Store payment reference in localStorage for tracking
        localStorage.setItem('current_payment_ref', data.reference);
        localStorage.setItem('current_payment_plan', JSON.stringify({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          duration: plan.duration,
          amountKES: amountKES,
          description: plan.description,
          features: plan.features
        }));
        
        // Redirect to Paystack payment page
        window.location.href = data.authorization_url;
      } else {
        alert('Payment initialization failed: ' + (data.error || 'Unknown error'));
        setProcessing(false);
        setPaymentMethod(null);
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Please try again.');
      setProcessing(false);
      setPaymentMethod(null);
    }
  };

  const handleMpesaPayment = () => {
    initializePayment('mpesa');
  };

  const handleCardPayment = () => {
    initializePayment('card');
  };

  const handleCryptoContact = () => {
    setShowCryptoInfo(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const item = cart.items[0];
  const plan = item.plan;
  const amountKES = plan.price * 129;

  return (
    <>
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="flex items-center gap-2 text-primary hover:text-accent transition mb-6">
              <ArrowLeft size={20} />
              Back to Cart
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Customer Info - Read Only */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Customer Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-foreground mb-2 font-semibold">Name</label>
                    <div className="w-full px-4 py-3 bg-secondary border border-border rounded text-foreground">
                      {user.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-foreground mb-2 font-semibold">Email</label>
                    <div className="w-full px-4 py-3 bg-secondary border border-border rounded text-foreground">
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-foreground mb-2 font-semibold">Phone</label>
                    <div className="w-full px-4 py-3 bg-secondary border border-border rounded text-foreground">
                      {user.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lock size={24} className="text-primary" />
                  Choose Payment Method
                </h2>

                <div className="bg-secondary border border-border rounded-lg p-4 mb-6 flex items-center gap-2 text-muted-foreground text-sm">
                  <Lock size={16} />
                  <span>Your payment is secure and encrypted. Powered by Paystack</span>
                </div>

                {/* Payment Method Options */}
                <div className="space-y-4 mb-6">
                  {/* M-Pesa Option */}
                  <button
                    onClick={handleMpesaPayment}
                    disabled={processing}
                    className="w-full p-4 bg-secondary border-2 border-border hover:border-primary rounded-lg transition flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <img 
                          src="/mpesa.png" 
                          alt="M-Pesa" 
                          className="w-8 h-8" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/M-PESA_Logo.svg/256px-M-PESA_Logo.svg.png';
                          }} 
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-foreground">M-Pesa</p>
                        <p className="text-sm text-muted-foreground">Pay with M-Pesa mobile money</p>
                      </div>
                    </div>
                    {processing && paymentMethod === 'mpesa' ? (
                      <Loader2 size={20} className="animate-spin text-primary" />
                    ) : (
                      <Smartphone size={20} className="text-muted-foreground group-hover:text-primary transition" />
                    )}
                  </button>

                  {/* Card Option */}
                  <button
                    onClick={handleCardPayment}
                    disabled={processing}
                    className="w-full p-4 bg-secondary border-2 border-border hover:border-primary rounded-lg transition flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <img 
                          src="/visa.png" 
                          alt="Visa" 
                          className="h-8 w-auto" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/256px-Visa_Inc._logo.svg.png';
                          }} 
                        />
                        <img 
                          src="/mastercard.png" 
                          alt="Mastercard" 
                          className="h-8 w-auto" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/256px-Mastercard-logo.svg.png';
                          }} 
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-foreground">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, and more</p>
                      </div>
                    </div>
                    {processing && paymentMethod === 'card' ? (
                      <Loader2 size={20} className="animate-spin text-primary" />
                    ) : (
                      <CreditCard size={20} className="text-muted-foreground group-hover:text-primary transition" />
                    )}
                  </button>

                  {/* Crypto/Binance Option */}
                  <div>
                    <button
                      onClick={handleCryptoContact}
                      className="w-full p-4 bg-secondary border-2 border-border hover:border-primary rounded-lg transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <img 
                            src="/crypto.png" 
                            alt="Binance" 
                            className="w-8 h-8" 
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Binance_logo.svg/256px-Binance_logo.svg.png';
                            }} 
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-foreground">Cryptocurrency / Binance</p>
                          <p className="text-sm text-muted-foreground">Pay with USDT, Bitcoin, or other crypto</p>
                        </div>
                      </div>
                      <Phone size={20} className="text-muted-foreground group-hover:text-primary transition" />
                    </button>

                    {/* Crypto Contact Info */}
                    {showCryptoInfo && (
                      <div className="mt-3 p-4 bg-primary/10 border border-primary rounded-lg">
                        <p className="text-sm text-foreground mb-2">
                          📞 For crypto payments, please contact us directly:
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <a
                            href="tel:0701519280"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition"
                          >
                            <Phone size={16} />
                            Call 0701 519 280
                          </a>
                          <a
                            href="https://wa.me/254701519280"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.032 2.00195C6.036 2.00195 1.13196 6.90495 1.13196 12.902C1.13196 14.878 1.65796 16.798 2.62796 18.472L1.19196 22.644L5.50196 21.245C7.12196 22.117 8.94396 22.582 10.828 22.582H10.834C16.826 22.582 21.732 17.679 21.732 11.682C21.732 8.78995 20.538 6.10795 18.371 4.04895C16.299 2.07795 13.338 1.00195 12.032 1.00195V2.00195Z" fill="white"/>
                            </svg>
                            WhatsApp
                          </a>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          Our team will help you complete the crypto payment process.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    💡 By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-semibold">{plan.name}</span>
                      <span className="text-muted-foreground text-sm">x{item.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Lifetime Access</span>
                      <span>${plan.price.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      🎓 Lifetime Subscription
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal (USD)</span>
                    <span className="text-foreground font-bold">${plan.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span className="text-foreground font-bold">1 USD = 129 KES</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-bold">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-bold text-foreground">Total (USD)</span>
                    <span className="text-2xl font-bold text-primary">${plan.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-foreground">Total (KES)</span>
                    <span className="text-xl font-bold text-primary">KES {amountKES.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                    <p className="text-xs text-center text-primary font-semibold">
                      ✨ One-time payment • Lifetime access • Never expires
                    </p>
                  </div>
                </div>

                {/* Payment Icons */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    We accept:
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img src="/mpesa.png" alt="M-Pesa" className="h-6 w-auto opacity-60" onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/M-PESA_Logo.svg/256px-M-PESA_Logo.svg.png';
                    }} />
                    <img src="/visa.png" alt="Visa" className="h-6 w-auto opacity-60" onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/256px-Visa_Inc._logo.svg.png';
                    }} />
                    <img src="/mastercard.png" alt="Mastercard" className="h-6 w-auto opacity-60" onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/256px-Mastercard-logo.svg.png';
                    }} />
                    <img src="/crypto.png" alt="Binance" className="h-6 w-auto opacity-60" onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Binance_logo.svg/256px-Binance_logo.svg.png';
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-8 text-center max-w-sm mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-foreground mb-2">Initializing Payment</h3>
            <p className="text-muted-foreground">
              Please wait while we prepare your payment...
            </p>
          </div>
        </div>
      )}
    </>
  );
}