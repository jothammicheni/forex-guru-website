'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Award, ChevronLeft, ChevronRight, Star, ThumbsUp, Flag, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Brian M',
    text: 'Before joining this mentorship, I was low-key gambling for about a year. But after joining, I can confidently say I am purely trading with a well-defined trading plan backed up with a strategy which has an edge in the market.',
    rating: 5,
    date: '2 weeks ago',
    avatar: 'B',
    isVerified: true,
    likes: 12,
  },
  {
    name: 'Wambui K',
    text: 'Learning Trading from Rick @ Clinical Forex has been worth my time and money. Everything is explained so well and the course material is well organized and relevant. I would definitely recommend to anyone.',
    rating: 4,
    date: '1 month ago',
    avatar: 'W',
    isVerified: true,
    likes: 8,
  },
  {
    name: 'Maryama B',
    text: 'The course was very easy to understand for an absolute beginner like me. It took me less than 3 months to start demo trading. The mental preparation was incredibly helpful in dealing with bad trading days.',
    rating: 5,
    date: '2 months ago',
    avatar: 'M',
    isVerified: true,
    likes: 15,
  },
  {
    name: 'Anthony M',
    text: 'I am very happy with the mentorship. I was really struggling and kept blowing accounts. Your course was an eye opener. I appreciate how professional and committed you are to my success.',
    rating: 3,
    date: '3 months ago',
    avatar: 'A',
    isVerified: true,
    likes: 24,
  },
  {
    name: 'Abdiaziz B',
    text: 'I came to know forex was legit in 2023. Clinical fx helped me understand the real world of trading. Now I can comfortably trade and make money. Very professional experience.',
    rating: 5,
    date: '1 month ago',
    avatar: 'A',
    isVerified: true,
    likes: 6,
  },
  {
    name: 'Eunice M',
    text: 'Am privileged to be a part of Clinical Fx. Incredible course! I now feel so confident in my trading and doing great. Thanks for the guidance, motivation and support.',
    rating: 5,
    date: '2 weeks ago',
    avatar: 'E',
    isVerified: true,
    likes: 19,
  },
];

// Google Icon Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-[#FBBC05] text-[#FBBC05]" : "text-[#E0E0E0]"}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component (Google Style)
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col hover:border-primary transition">
    {/* Google Icon Header */}
    <div className="flex items-center gap-2 mb-4">
      <GoogleIcon />
      <span className="text-xs text-muted-foreground">Google Review</span>
    </div>

    {/* Rating */}
    <div className="mb-3">
      <StarRating rating={testimonial.rating} />
    </div>

    {/* Review Text */}
    <p className="text-foreground text-sm leading-relaxed mb-4 flex-1">
      "{testimonial.text}"
    </p>

    {/* Author Info */}
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">{testimonial.date}</span>
            {testimonial.isVerified && (
              <>
                <span className="text-border text-xs">•</span>
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#34A853"/>
                  </svg>
                  <span className="text-xs text-muted-foreground">Verified</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button className="p-1.5 text-muted-foreground hover:text-foreground transition rounded-full hover:bg-secondary">
          <ThumbsUp size={14} />
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground transition rounded-full hover:bg-secondary">
          <Flag size={14} />
        </button>
        <button className="p-1.5 text-muted-foreground hover:text-foreground transition rounded-full hover:bg-secondary">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Handle responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);
  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <h1 className="font-script text-6xl md:text-7xl text-primary mb-4 drop-shadow-lg">
              ForexGuru
            </h1>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 drop-shadow-lg">
            Kickstart Your Trading Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Join the best trading community to better your results. Learn proven strategies from experienced mentors and build the confidence to trade professionally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded hover:bg-accent transition transform hover:scale-105"
            >
              Explore Membership
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground border border-primary text-lg font-bold rounded hover:bg-primary/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-foreground text-lg">Active Traders</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <p className="text-foreground text-lg">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/5</div>
              <p className="text-foreground text-lg">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">Why Choose ForexGuru?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Proven Strategies</h3>
              <p className="text-muted-foreground">
                Learn our exact prop firm pass strategy with back-tested data and documented playbooks.
              </p>
            </div>
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Community Support</h3>
              <p className="text-muted-foreground">
                Join 500+ traders in our private community with live sessions and Q&A support.
              </p>
            </div>
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Award size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Expert Mentorship</h3>
              <p className="text-muted-foreground">
                Get personalized coaching and access to psychology sessions to master trading psychology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Carousel Slider with original background */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Header with Google Reviews style */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GoogleIcon />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Google Reviews
              </h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">5.0</span>
            </div>
            <p className="text-gray-300">
              Based on {testimonials.length} Google reviews
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-card rounded-full p-2 shadow-lg border border-border hover:bg-secondary transition"
                >
                  <ChevronLeft size={24} className="text-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-card rounded-full p-2 shadow-lg border border-border hover:bg-secondary transition"
                >
                  <ChevronRight size={24} className="text-foreground" />
                </button>
              </>
            )}

            {/* Slides */}
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="flex">
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="w-full flex-shrink-0"
                      style={{ flex: `0 0 100%` }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {testimonials
                          .slice(
                            slideIndex * itemsPerSlide,
                            (slideIndex + 1) * itemsPerSlide
                          )
                          .map((testimonial, idx) => (
                            <TestimonialCard key={idx} testimonial={testimonial} />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-gray-400 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Write a review CTA */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-200 hover:bg-white/10 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2L22 4L20 6L18 4L20 2Z" fill="#9CA3AF"/>
                <path d="M4 20L14 10L16 12L6 22L4 20Z" fill="#9CA3AF"/>
                <path d="M3 21L5 20L4 19L3 21Z" fill="#9CA3AF"/>
              </svg>
              Write a review on Google
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Start Your Trading Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose from our flexible membership plans and join hundreds of successful traders.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded hover:bg-accent transition transform hover:scale-105"
          >
            View Plans
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 ForexGuru. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </>
  );
}