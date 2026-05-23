'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase/client';
import { ArrowLeft, CheckCircle, Phone, MessageCircle, ExternalLink, Calendar, Award } from 'lucide-react';

interface Payment {
  id: string;
  plan_title: string;
  plan_id: string;
  amount: number;
  status: string;
  created_at: string;
  payment_method: string;
  customer_name: string;
  customer_email: string;
}

export default function MyPlansPage() {
  const [user, setUser] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    fetchUserData(currentUser.email);
  }, [router]);

  const fetchUserData = async (email: string) => {
    setLoading(true);
    try {
      // Fetch completed payments from Supabase - these are your active subscriptions
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('customer_email', email)
        .eq('status', 'COMPLETED')
        .order('created_at', { ascending: false });

      if (paymentsError) {
        console.error('Error fetching payments:', paymentsError);
      } else {
        setPayments(paymentsData || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = (planName: string) => {
    const message = `Hello ForexGuru Team,%0A%0A*My Active Plan:* ${planName}%0A*Name:* ${user?.name}%0A*Email:* ${user?.email}%0A*Phone:* ${user?.phone}%0A%0AI need assistance with my trading journey. Please guide me on the next steps to maximize my learning.`;
    window.open(`https://wa.me/254701519280?text=${message}`, '_blank');
  };

  const handleCallSupport = () => {
    window.location.href = 'tel:0701519280';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading your plans...</p>
        </div>
      </div>
    );
  }

  const hasActivePlan = payments.length > 0;
  const latestPlan = payments.length > 0 ? payments[0] : null;

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition mb-6">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground">My Plans</h1>
          <p className="text-muted-foreground mt-2">Manage your subscriptions and access learning resources</p>
        </div>

        {/* User Profile */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground mb-2">Full Name</p>
              <p className="text-xl font-bold text-foreground">{user?.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Email Address</p>
              <p className="text-xl font-bold text-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Phone Number</p>
              <p className="text-xl font-bold text-foreground">{user?.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Member Since</p>
              <p className="text-xl font-bold text-foreground">
                {payments.length > 0 ? new Date(payments[payments.length - 1].created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Active Plans Section - Derived from Payments */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Active Subscriptions</h2>
          
          {!hasActivePlan ? (
            <div className="bg-secondary border border-border rounded-lg p-12 text-center">
              <Award size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4 text-lg">No active plans yet</p>
              <p className="text-muted-foreground text-sm mb-6">Choose a membership plan to start your trading journey</p>
              <Link
                href="/membership"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-accent transition"
              >
                Browse Membership Plans
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {payments.map((payment) => (
                <div key={payment.id} className="bg-secondary border border-border rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={20} className="text-green-500" />
                        <h3 className="text-xl font-bold text-foreground">{payment.plan_title}</h3>
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          Lifetime Access
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Purchased on {new Date(payment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-2xl font-bold text-primary">
                        KES {payment.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Paid via {payment.payment_method === 'mpesa' ? 'M-Pesa' : payment.payment_method || 'Card'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4 mt-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleWhatsAppContact(payment.plan_title)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <MessageCircle size={18} />
                        Contact Mentor on WhatsApp
                      </button>
                      <button
                        onClick={handleCallSupport}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition"
                      >
                        <Phone size={18} />
                        Call Support
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Your message will include your plan details for faster assistance
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Learning Resources */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-2">Video Library</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Access 35+ in-depth trading videos covering all aspects of forex trading.
              </p>
              <button 
                disabled={!hasActivePlan}
                className={`w-full px-4 py-2 rounded text-sm font-bold transition ${
                  hasActivePlan 
                    ? 'bg-primary text-primary-foreground hover:bg-accent cursor-pointer' 
                    : 'bg-secondary border border-border text-muted-foreground cursor-not-allowed'
                }`}
              >
                {hasActivePlan ? 'Ongoing' : 'Subscribe to Access'}
              </button>
            </div>
            <div className="bg-secondary border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-2">Community Access</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Join our private Telegram community and connect with 500+ traders.
              </p>
              <button 
                disabled={!hasActivePlan}
                className={`w-full px-4 py-2 rounded text-sm font-bold transition ${
                  hasActivePlan 
                    ? 'bg-primary text-primary-foreground hover:bg-accent cursor-pointer' 
                    : 'bg-secondary border border-border text-muted-foreground cursor-not-allowed'
                }`}
              >
                {hasActivePlan ? 'Ongoing' : 'Subscribe to Access'}
              </button>
            </div>
            <div className="bg-secondary border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-2">Trading Resources</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Download strategy playbooks, checklists, and trading templates.
              </p>
              <button 
                disabled={!hasActivePlan}
                className={`w-full px-4 py-2 rounded text-sm font-bold transition ${
                  hasActivePlan 
                    ? 'bg-primary text-primary-foreground hover:bg-accent cursor-pointer' 
                    : 'bg-secondary border border-border text-muted-foreground cursor-not-allowed'
                }`}
              >
                {hasActivePlan ? 'Ongoing' : 'Subscribe to Access'}
              </button>
            </div>
            <div className="bg-secondary border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-2">Mentor Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get personalized support from your dedicated mentor.
              </p>
              <button 
                onClick={() => hasActivePlan && latestPlan && handleWhatsAppContact(latestPlan.plan_title)}
                disabled={!hasActivePlan}
                className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded text-sm font-bold transition ${
                  hasActivePlan 
                    ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer' 
                    : 'bg-secondary border border-border text-muted-foreground cursor-not-allowed'
                }`}
              >
                <MessageCircle size={16} />
                {hasActivePlan ? 'Contact Mentor' : 'Subscribe to Access'}
              </button>
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">Need Assistance?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Our support team is here to help you with any questions about your plan
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleCallSupport}
              className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition"
            >
              <Phone size={16} />
              Call 0701 519 280
            </button>
            <button
              onClick={() => window.open('mailto:support@forexguru.com', '_blank')}
              className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-secondary border border-primary text-foreground rounded-lg hover:bg-primary/10 transition"
            >
              <ExternalLink size={16} />
              Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}