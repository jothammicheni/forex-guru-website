'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send, ArrowRight, Shield, Clock, Award } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="font-script text-3xl text-primary font-bold mb-4">
              ForexGuru
            </div>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Empowering traders with knowledge, strategy, and community. Join hundreds of successful traders who mastered the markets with our proven mentorship program.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-muted-foreground hover:text-primary transition text-sm">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-primary transition text-sm">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-primary transition text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-muted-foreground hover:text-primary transition text-sm">
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">Stay Updated</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span>support@forexguru.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>123 Trading Street, Financial District, New York, NY 10005</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Subscribe to our newsletter for trading tips and updates:
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Secure Payments</p>
                <p className="text-muted-foreground text-xs">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">24/5 Support</p>
                <p className="text-muted-foreground text-xs">Mon-Fri, 9am-6pm EST</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Trusted Platform</p>
                <p className="text-muted-foreground text-xs">500+ active members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#0D9488"/>
                </svg>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Verified Reviews</p>
                <p className="text-muted-foreground text-xs">98% satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Payment methods:</span>
              <div className="flex gap-2">
                <img src="https://cdn.jsdelivr.net/gh/amcharts/amcharts4@master/fonts/fontawesome/webfonts/fa-credit-card.svg" alt="Visa" className="h-6 w-auto opacity-60" />
                <span className="text-xs text-muted-foreground">Visa</span>
                <span className="text-xs text-muted-foreground">Mastercard</span>
                <span className="text-xs text-muted-foreground">PayPal</span>
                <span className="text-xs text-muted-foreground">Crypto</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © {currentYear} ForexGuru. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary/50 border-t border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <p>
              Disclaimer: Trading forex involves significant risk of loss. Past performance does not guarantee future results.
            </p>
            <Link href="/disclaimer" className="hover:text-primary transition">
              Read Full Disclaimer →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}