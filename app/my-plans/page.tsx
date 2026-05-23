'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';

export default function MyPlansPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-foreground">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition mb-6">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-foreground">My Plans</h1>
          </div>

          {/* User Profile */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground mb-2">Full Name</p>
                <p className="text-xl font-bold text-foreground">{user.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Email Address</p>
                <p className="text-xl font-bold text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Phone Number</p>
                <p className="text-xl font-bold text-foreground">{user.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Member ID</p>
                <p className="text-xl font-bold text-foreground">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Active Plans */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Active Plans</h2>
            <div className="bg-secondary border border-border rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-4">No active plans yet</p>
              <Link
                href="/membership"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-accent transition"
              >
                Browse Membership Plans
              </Link>
            </div>
          </div>

          {/* Learning Resources */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Video Library</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Access 35+ in-depth trading videos covering all aspects of forex trading.
                </p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-bold hover:bg-accent transition">
                  Coming Soon
                </button>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Community Access</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Join our private Telegram community and connect with 500+ traders.
                </p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-bold hover:bg-accent transition">
                  Coming Soon
                </button>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Trading Resources</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Download strategy playbooks, checklists, and trading templates.
                </p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-bold hover:bg-accent transition">
                  Coming Soon
                </button>
              </div>
              <div className="bg-secondary border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Support Center</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get help from our support team. Available 24/5 during trading hours.
                </p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-bold hover:bg-accent transition">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
