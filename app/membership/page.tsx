'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PLANS, addToCart, getPlanById } from '@/lib/cart';
import { Check, ArrowRight, DollarSign } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

// Exchange rate (example: 1 USD = 129 KSH)
const USD_TO_KSH = 129;

// Function to convert USD to KSH
const convertToKSH = (usd: number) => {
  return Math.round(usd * USD_TO_KSH);
};

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = (planId: string) => {
    const plan = getPlanById(planId);
    if (plan) {
      addToCart(plan);
      // Dispatch event to update navbar
      window.dispatchEvent(new Event('storage'));
      router.push('/cart');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="italic font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Membership Plans
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that best fits your trading journey
            </p>
           
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {PLANS.map((plan) => {
              const kshPrice = convertToKSH(plan.price);
              
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-lg border transition transform hover:scale-105 ${
                    plan.popular
                      ? 'border-primary bg-card shadow-xl md:scale-105'
                      : 'border-border bg-card'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}

                  {/* Plan Content */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2 italic font-serif">{plan.name}</h2>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>

                    {/* Price with KSH Equivalent */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">${plan.price}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-semibold text-primary">
                          KSH {kshPrice.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-sm">/{plan.duration}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        ≈ KSH {Math.round(kshPrice / 30).toLocaleString()}/day
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleAddToCart(plan.id)}
                      className={`italic font-serif w-full py-3 rounded font-bold transition mb-8 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-primary text-primary-foreground hover:bg-accent'
                          : 'bg-secondary text-foreground border border-primary hover:bg-primary/10'
                      }`}
                    >
                      <span>Join Now</span>
                      <ArrowRight size={18} />
                    </button>

                    {/* Features */}
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-muted-foreground mb-4">
                        Includes:
                      </p>
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                   
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Section */}
          <div className="bg-card border border-border rounded-lg p-8 mb-16">
            <h2 className=" italic font-serif text-3xl font-bold text-foreground mb-8 text-center">
              Why Our Members Choose ForexGuru
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Professional Training</h3>
                <p className="text-muted-foreground leading-relaxed">
                  35+ in-depth videos covering everything from basic concepts to advanced trading strategies. Learn our exact prop firm pass strategy with back-tested data.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Community Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join 500+ active traders in our private community. Access live Q&A sessions, trade breakdowns, and connect with fellow traders on your journey.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Psychology Coaching</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Master the psychology of trading. Our sessions help you develop discipline, manage emotions, and maintain consistent performance under pressure.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">24/5 Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get answers when you need them. Our support team is available throughout the trading week to help you succeed with your trading journey.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="italic font-serif text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Can I pay in Kenyan Shillings (KSH)?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We accept payments in KSH through bank transfer and M-Pesa (coming soon). The KSH equivalent shown is based on the current exchange rate and may vary slightly.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Is there a money-back guarantee?
                </h3>
                <p className="text-muted-foreground">
                  We&apos;re confident in our training. If you&apos;re not satisfied within 30 days, we offer a full refund. No questions asked.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards (USD) and bank transfers (USD/KSH). M-Pesa payments for Kenyan clients will be available soon.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Do I get lifetime access to the materials?
                </h3>
                <p className="text-muted-foreground">
                  Silver and Gold plans give access during your subscription period. The 1-on-1 Mentorship plan includes lifetime access to all materials and future webinars.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Why show prices in both USD and KSH?
                </h3>
                <p className="text-muted-foreground">
                  We serve traders globally, with many members from Kenya and East Africa. Showing both currencies helps you understand the exact cost in your local currency.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-secondary border border-border rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 italic font-serif">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join hundreds of successful traders and start your journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cart"
                className="italic font-serif px-8 py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-accent transition"
              >
                View Cart
              </Link>
              <Link
                href="/"
                className="italic font-serif px-8 py-3 bg-card border border-primary text-foreground rounded font-bold hover:bg-primary/10 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}