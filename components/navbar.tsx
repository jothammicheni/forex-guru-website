'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart, LogOut, User, Menu, X } from 'lucide-react';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import { getCart } from '@/lib/cart';

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
    setCartCount(getCart().items.length);

    // Listen for cart changes
    const handleStorageChange = () => {
      setCartCount(getCart().items.length);
      setUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Close mobile menu when window resizes to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/membership', label: 'Membership' },
    { href: '/about', label: 'About' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/faq', label: 'FAQs' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-50">
              <div className="font-script text-2xl text-primary font-bold">ForexGuru</div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-foreground hover:text-primary transition z-50"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu - Desktop */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                    <Link
                      href="/my-plans"
                      className="italic font-serif flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-accent transition"
                    >
                      <User size={18} />
                      <span>My Plans</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="italic font-serif flex items-center gap-2 px-3 py-2 bg-destructive/20 text-destructive rounded hover:bg-destructive/30 transition"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="italic font-serif px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-accent transition"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-foreground hover:text-primary transition z-50 italic font-serif"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden">
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-4 mb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition text-lg py-3 border-b border-border"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile User Actions */}
              <div className="border-t border-border pt-6">
                {user ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Logged in as <span className="text-foreground font-semibold">{user.name}</span>
                    </div>
                    <Link
                      href="/my-plans"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="italic font-serif flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition"
                    >
                      <User size={18} />
                      My Plans
                    </Link>
                    <button
                      onClick={handleLogout}
                      className=" italic font-serif flex items-center justify-center gap-2 w-full px-4 py-3 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jump when mobile menu opens */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}