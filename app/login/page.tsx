'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser, registerUser } from '@/lib/auth';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = loginUser(formData.email, formData.password);
      if (user) {
        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event('storage'));
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      const success = registerUser(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      );

      if (success) {
        // Auto-login after registration
        const user = loginUser(formData.email, formData.password);
        if (user) {
          window.dispatchEvent(new Event('storage'));
          router.push('/');
        }
      } else {
        setError('Email already registered. Please login instead.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isLogin ? handleLogin : handleRegister;

  return (
    <>
      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 w-full py-12 px-4">
          <div className="max-w-md mx-auto">
            {/* Back to Home Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
              Back to Home
            </Link>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setFormData({ name: '', email: '', phone: '', password: '' });
                }}
                className={`flex-1 py-3 rounded font-bold transition ${
                  isLogin
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/80 backdrop-blur-sm text-foreground border border-border'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setFormData({ name: '', email: '', phone: '', password: '' });
                }}
                className={`flex-1 py-3 rounded font-bold transition ${
                  !isLogin
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/80 backdrop-blur-sm text-foreground border border-border'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form Card with Backdrop Blur */}
            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>

              {error && (
                <div className="bg-destructive/20 border border-destructive text-destructive rounded p-4 mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-foreground mb-2 font-semibold">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-muted-foreground" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-foreground mb-2 font-semibold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-foreground mb-2 font-semibold">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-muted-foreground" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1234567890"
                        className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-foreground mb-2 font-semibold">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-accent transition"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-accent disabled:opacity-50 transition transform hover:scale-105"
                >
                  {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-muted-foreground mt-6">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-bold hover:text-accent transition"
                >
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </p>

              {/* Demo Credentials for Testing */}
              {isLogin && (
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    Demo Credentials:
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    Email: demo@example.com<br />
                    Password: demo123
                  </p>
                </div>
              )}
            </div>

            {/* Info Message */}
            <div className="mt-6 p-4 bg-card/80 backdrop-blur-sm border border-border rounded">
              <p className="text-xs text-muted-foreground text-center">
                Your data is securely stored in your browser. No payment information is required to create an account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}