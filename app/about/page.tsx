'use client';

import Link from 'next/link';
import { ArrowRight, Users, Award, TrendingUp, Heart, Calendar, MapPin, Quote, Target, Eye, Lightbulb, Shield, Clock, BookOpen, BarChart3, Trophy } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      
      <div className="min-h-screen bg-background">
        {/* Hero Section - Matching your format */}
        <section
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
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
                About <span className="text-foreground">ForexGuru</span>
              </h1>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 drop-shadow-lg">
              Empowering Traders Worldwide
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Discover the story behind ForexGuru and meet the mentor dedicated to transforming your trading journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded hover:bg-accent transition transform hover:scale-105"
              >
                Join Our Community
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground border border-primary text-lg font-bold rounded hover:bg-primary/10 transition"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Founder/Mentor Section */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-16 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Mentor Photo - Using your provided image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yuScX68tQ-8Q2b7WljzbFrBy_2An-FMT6w&s"
                    alt="John Doe - Lead Mentor"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-4 border-primary shadow-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://randomuser.me/api/portraits/men/1.jpg';
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                    <Trophy size={20} className="text-primary-foreground" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      John Doe
                    </h2>
                    <p className="text-xl text-primary font-semibold mb-3">
                      Founder & Lead Mentor
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        12+ Years Trading Experience
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        Global Mentor
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs font-semibold text-primary">
                      Verified Prop Trader
                    </div>
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs font-semibold text-primary">
                      Funded Account $2.5M+
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  John started his trading journey over a decade ago, experiencing both massive losses and incredible wins. 
                  After losing his first three funded accounts, he developed a systematic approach that transformed his trading 
                  from gambling to professional strategy. Today, he manages multiple funded accounts and has helped over 500 
                  students achieve consistent profitability.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "I created ForexGuru because I believe anyone can become a successful trader with the right education and 
                  mindset. Our curriculum isn't just about strategies—it's about building traders who can weather any market condition."
                </p>

                {/* Mentor Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">500+</p>
                    <p className="text-xs text-muted-foreground">Students Mentored</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">$2.5M+</p>
                    <p className="text-xs text-muted-foreground">Prop Firm Capital</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">35+</p>
                    <p className="text-xs text-muted-foreground">Course Modules</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">98%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Target size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To democratize professional forex trading education by making it accessible, actionable, and community-driven.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to bridging the gap between theory and practice, ensuring every member develops the skills, 
                confidence, and discipline needed to succeed in the forex market.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Eye size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To become the world's most trusted forex trading education platform, known for producing consistently profitable traders.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a global community where traders support each other, share insights, and grow together while achieving 
                financial independence through disciplined trading.
              </p>
            </div>
          </div>

          {/* Core Values Section with Icons */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Heart size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Passion for Education</h3>
                <p className="text-muted-foreground">
                  We're genuinely passionate about teaching and seeing our students succeed. Every course is crafted with care.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Shield size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Integrity First</h3>
                <p className="text-muted-foreground">
                  We teach what actually works. No fluff, no get-rich-quick promises—just proven, transparent strategies.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Users size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Community First</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community. Every member lifts others, creating an unbeatable support system.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <TrendingUp size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Continuous Growth</h3>
                <p className="text-muted-foreground">
                  Markets evolve, and so do we. Our curriculum is constantly updated with new strategies and insights.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Award size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We hold ourselves to the highest standards, delivering premium education that produces real results.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Lightbulb size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new technologies and teaching methods to enhance the learning experience.
                </p>
              </div>
            </div>
          </div>

          {/* Our Story with Timeline */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <div className="space-y-6 text-muted-foreground">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">2019: The Beginning</h3>
                  <p>
                    ForexGuru started as a small mentorship program with just 5 students. John realized the gap between 
                    expensive courses that didn't deliver and affordable education that lacked depth.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">2020-2021: Rapid Growth</h3>
                  <p>
                    Word spread about our unique approach to trading psychology and prop firm strategies. Our community 
                    grew to 200+ active members, and we launched our first comprehensive video course.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">2022: Prop Firm Success</h3>
                  <p>
                    35 members passed their first prop firm challenge using our strategies. This validated our teaching 
                    methodology and attracted traders from around the world.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">2023-Present: Global Community</h3>
                  <p>
                    Today, ForexGuru serves 500+ active members across 30+ countries. We've evolved into a complete 
                    trading ecosystem with live sessions, mentorship programs, and advanced strategy courses.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote from Founder */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex gap-3">
                <Quote size={32} className="text-primary flex-shrink-0" />
                <p className="text-foreground italic text-lg">
                  "Every successful trader started as a beginner. Our job is to make that journey shorter, smoother, and more successful."
                </p>
              </div>
              <p className="text-right text-muted-foreground mt-3">— John Doe, Founder</p>
            </div>
          </div>

          {/* What Sets Us Apart */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Makes Us Different?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Not all trading education is created equal
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Strategy + Psychology</h3>
                  <p className="text-muted-foreground">
                    Most courses teach strategies. We teach the mindset and discipline needed to execute them consistently.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Live Mentorship</h3>
                  <p className="text-muted-foreground">
                    Weekly live trading sessions, Q&As, and real-time market analysis with experienced mentors.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <BarChart3 size={20} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Prop Firm Focus</h3>
                  <p className="text-muted-foreground">
                    Specialized training for passing prop firm challenges and managing funded accounts.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Clock size={20} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Lifetime Access</h3>
                  <p className="text-muted-foreground">
                    One-time payment gives you lifetime access to all course materials and future updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section with Enhanced Design */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-xs text-muted-foreground mt-1">and growing daily</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                <p className="text-xs text-muted-foreground mt-1">from verified reviews</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">35+</div>
                <p className="text-sm text-muted-foreground">Video Courses</p>
                <p className="text-xs text-muted-foreground mt-1">100+ hours of content</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30+</div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-xs text-muted-foreground mt-1">global community</p>
              </div>
            </div>
          </div>

          {/* Testimonial Highlight */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Quote size={32} className="text-primary" />
              </div>
              <p className="text-xl md:text-2xl text-foreground italic mb-6 max-w-3xl">
                "ForexGuru transformed my trading completely. The combination of strategy education and psychology training 
                is unmatched. I passed my first prop firm challenge in just 3 months!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  BM
                </div>
                <div>
                  <p className="font-bold text-foreground">Brian M</p>
                  <p className="text-sm text-muted-foreground">Funded Trader</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-secondary border border-border rounded-2xl p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Transform Your Trading?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join a community of successful traders who have mastered the markets with our proven strategies and mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent transition"
              >
                Explore Membership Plans
              </Link>
              <Link
                href="/reviews"
                className="inline-block px-8 py-3 bg-card text-foreground border border-border rounded-lg font-bold hover:bg-secondary transition"
              >
                Read Student Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}