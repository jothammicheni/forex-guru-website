'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is ForexGuru and how does it work?',
    answer: 'ForexGuru is a comprehensive forex trading education platform. We provide in-depth video courses, proven trading strategies, live mentorship, and community support. Our program is designed to take you from complete beginner to confident, profitable trader.',
  },
  {
    question: 'Who is ForexGuru suitable for?',
    answer: 'ForexGuru is suitable for anyone interested in learning forex trading - whether you\'re a complete beginner or have some trading experience. Our curriculum is structured to meet you at your level and guide you progressively toward professional trading.',
  },
  {
    question: 'What are the membership plan differences?',
    answer: 'Silver (Monthly): $47/month for ongoing education and community access. Gold (Quarterly): $127 for 3 months - our most popular option. 1-on-1 Mentorship (Lifetime): $417 for personalized coaching and lifetime access to all materials and future content.',
  },
  {
    question: 'Can I upgrade or change my plan?',
    answer: 'Yes! You can upgrade to a higher tier plan at any time. Simply add the new plan to your cart and your membership will be updated. Any unused balance from your previous plan can be credited toward the upgrade.',
  },
  {
    question: 'How long does the course take to complete?',
    answer: 'The course is self-paced, so it depends on how quickly you move through the material. Most members complete the core curriculum in 2-3 months while continuing to trade. You can take longer if needed - your access doesn\'t expire as long as your membership is active.',
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied with the course for any reason, contact our support team for a full refund. We\'re confident you\'ll find value in our training.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Currently, we accept all major credit cards. In the coming months, we\'re adding PayStack to make payments easier for our African community. We\'re always working to expand our payment options.',
  },
  {
    question: 'Is the 1-on-1 mentorship worth it?',
    answer: 'Absolutely, if you prefer personalized guidance. The 1-on-1 mentorship includes private coaching calls, tailored strategy development, and direct access to experienced mentors. It\'s ideal if you want customized support for your specific trading goals.',
  },
  {
    question: 'What topics are covered in the course?',
    answer: 'Our curriculum covers: Forex fundamentals, technical analysis, candlestick patterns, chart reading, trading psychology, risk management, our specific trading strategies, live trade breakdowns, backtesting, prop firm preparation, and emotional discipline.',
  },
  {
    question: 'Is there live trading mentorship?',
    answer: 'Yes! Members get access to Q&A sessions, live trade breakdowns where we analyze real trades, pre-week market outlooks, weekly and monthly recaps, and psychology coaching sessions. The 1-on-1 plan includes private calls.',
  },
  {
    question: 'Can I access the course on mobile?',
    answer: 'The course materials are accessible on any device with an internet connection. While we recommend a larger screen for watching videos, you can review notes and join community discussions on mobile.',
  },
  {
    question: 'What happens after I complete the course?',
    answer: 'After completing the core curriculum, you\'ll be ready to start demo trading and potentially move to live trading or prop firm challenges. You\'ll have ongoing access to updates, new content, community support, and Q&A sessions for as long as your membership is active.',
  },
  {
    question: 'Is there a community or group to learn with?',
    answer: 'Yes! All members get access to our private Telegram community with 500+ traders. You\'ll connect with other learners, share trades, ask questions, and get support from both peers and mentors. This community is invaluable for staying motivated.',
  },
  {
    question: 'Do you teach scalping, day trading, or swing trading?',
    answer: 'We focus on swing trading and position trading strategies - approaches that are less time-intensive but highly profitable. Our strategies are designed for consistency and risk management rather than high-frequency trading.',
  },
  {
    question: 'How often is new content added?',
    answer: 'We regularly add new content based on market developments, member feedback, and emerging trading opportunities. The 1-on-1 mentorship plan includes access to all future webinars and content updates.',
  },
  {
    question: 'Can I get a refund or cancel my membership?',
    answer: 'You can cancel your membership at any time. For the 30-day money-back guarantee, contact our support team. After 30 days, cancellations are processed, though no prorated refunds are issued for partially used subscription periods.',
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <>
      
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-script  text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about ForexGuru
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition"
                >
                  <h3 className="text-lg font-bold text-foreground text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`text-primary flex-shrink-0 transition ${
                      openId === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                {openId === index && (
                  <div className="px-6 py-4 border-t border-border bg-secondary">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Didn&apos;t find your answer?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/5 to help you. Reach out and we&apos;ll get back to you shortly.
            </p>
            <a
              href="mailto:support@forexguru.com"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-accent transition"
            >
              Contact Support
            </a>
          </div>

          {/* CTA Section */}
          <div className="mt-8 bg-secondary border border-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <a
              href="/membership"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-accent transition"
            >
              View Membership Plans
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
