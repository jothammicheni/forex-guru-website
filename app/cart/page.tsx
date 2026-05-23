'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCart, removeFromCart, updateQuantity, clearCart } from '@/lib/cart';
import { Trash2, ArrowLeft, ShoppingBag, CreditCard, Shield } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
    setLoading(false);
  }, []);

  const handleRemove = (planId: string) => {
    removeFromCart(planId);
    setCart(getCart());
    window.dispatchEvent(new Event('storage'));
  };

  const handleUpdateQuantity = (planId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(planId, quantity);
    setCart(getCart());
    window.dispatchEvent(new Event('storage'));
  };

  const handleCheckout = () => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background py-8 sm:py-12 md:py-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Link 
              href="/membership" 
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition mb-4 sm:mb-6 text-sm sm:text-base"
            >
              <ArrowLeft size={18} />
              Back to Membership
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Shopping Cart</h1>
            {cart && cart.items.length > 0 && (
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                You have {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>

          {cart && cart.items.length === 0 ? (
            // Empty Cart - Responsive
            <div className="bg-card border border-border rounded-lg p-8 sm:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-muted-foreground" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm sm:text-base">
                Browse our membership plans and add one to get started with your trading journey.
              </p>
              <Link
                href="/membership"
                className="inline-block px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-accent transition"
              >
                Browse Plans
              </Link>
            </div>
          ) : (
            // Cart Items - Fully Responsive Grid
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Items List - Mobile First */}
              <div className="flex-1 space-y-4">
                {cart.items.map((item: any) => (
                  <div
                    key={item.planId}
                    className="bg-card border border-border rounded-lg p-4 sm:p-6"
                  >
                    {/* Mobile Layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Plan Info */}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                          {item.plan.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.plan.description}
                        </p>
                        <p className="text-primary font-bold text-base sm:text-lg">
                          ${item.plan.price}/{item.plan.duration}
                        </p>
                      </div>

                      {/* Actions - Stack on mobile, row on tablet+ */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        {/* Quantity Control */}
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => handleUpdateQuantity(item.planId, item.quantity - 1)}
                            className="px-3 py-2 text-muted-foreground hover:text-foreground transition text-lg font-bold"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-3 sm:px-4 py-2 text-foreground font-bold min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.planId, item.quantity + 1)}
                            className="px-3 py-2 text-muted-foreground hover:text-foreground transition text-lg font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-left sm:text-right min-w-[90px] sm:min-w-[100px]">
                          <p className="text-base sm:text-lg font-bold text-foreground">
                            ${(item.plan.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            ${item.plan.price} x {item.quantity}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.planId)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded transition"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Mobile price breakdown */}
                    <div className="mt-3 pt-3 border-t border-border sm:hidden">
                      <p className="text-xs text-muted-foreground">
                        ${item.plan.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary - Sticky on desktop, normal on mobile */}
              <div className="lg:w-96">
                <div className="bg-card border border-border rounded-lg p-5 sm:p-6 lg:sticky lg:top-20">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-5 pb-5 border-b border-border">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-semibold">
                        ${cart.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground font-semibold">$0.00</span>
                    </div>
                    {cart.items.length > 1 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Items</span>
                        <span className="text-foreground">{cart.items.length} plans</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-base sm:text-lg font-bold text-foreground">Total</span>
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        ${cart.total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Including all fees
                    </p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent transition mb-3 flex items-center justify-center gap-2"
                  >
                    <CreditCard size={18} />
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your cart?')) {
                        clearCart();
                        setCart(getCart());
                        window.dispatchEvent(new Event('storage'));
                      }
                    }}
                    className="w-full py-3 bg-destructive/20 text-destructive rounded-lg font-bold hover:bg-destructive/30 transition"
                  >
                    Clear Cart
                  </button>

                  <Link
                    href="/membership"
                    className="block text-center mt-4 text-primary hover:text-accent transition text-sm"
                  >
                    Continue Shopping
                  </Link>

                  {/* Trust Badge */}
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield size={14} />
                      <span>Secure Checkout</span>
                      <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                      <span>Money-back Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Section - When cart has items */}
          {cart && cart.items.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield size={18} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">Secure Payment</p>
                <p className="text-xs text-muted-foreground">Your data is protected</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard size={18} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">Instant Access</p>
                <p className="text-xs text-muted-foreground">Get immediate access after purchase</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#0D9488"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-foreground">30-Day Guarantee</p>
                <p className="text-xs text-muted-foreground">Full refund if not satisfied</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}