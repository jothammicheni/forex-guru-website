'use client';

import { Star, StarHalf, MoreHorizontal, ThumbsUp, Flag } from 'lucide-react';
import { ArrowRight, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Custom Google Icon Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const reviews = [
  {
    name: 'Brian M',
    rating: 5,
    text: 'Before joining this mentorship, I was low-key gambling for about a year since I didn\'t know what I was doing in the market. But after joining the mentorship, now I can confidently say I am purely trading with the help of a well-defined trading plan backed up with a strategy which has an edge in the market.',
    date: '2 weeks ago',
    avatar: 'B',
    isVerified: true,
    likes: 12,
  },
  {
    name: 'Wambui K',
    rating: 5,
    text: 'Learning Trading from the mentors here has been worth my time and money. Everything is explained so well and in detail and the course material is well organized and relevant. I would definitely recommend to anyone who wants to learn trading.',
    date: '1 month ago',
    avatar: 'W',
    isVerified: true,
    likes: 8,
  },
  {
    name: 'Maryama B',
    rating: 5,
    text: 'The course was very easy to understand for an absolute beginner like me, it took me less than 3 months to start demo trading and do a lot of necessary calculations that seemed daunting before taking the classes. The mental preparation was incredibly helpful.',
    date: '2 months ago',
    avatar: 'M',
    isVerified: true,
    likes: 15,
  },
  {
    name: 'Anthony M',
    rating: 5,
    text: 'I am very happy with the mentorship. I was really struggling and kept on blowing accounts. Your course was an eye opener. I appreciate how you have walked with me and with constant follow ups. Thanks to what I have learnt, I feel more confident about my trading future.',
    date: '3 months ago',
    avatar: 'A',
    isVerified: true,
    likes: 24,
  },
  {
    name: 'Abdiaziz B',
    rating: 5,
    text: 'I came to know forex trading was legit just in 2023. This platform helped me understand the real world of trading. Now I can comfortably trade and make money. From beginner level to where I am now, it was a smooth learning experience, very professional.',
    date: '1 month ago',
    avatar: 'A',
    isVerified: true,
    likes: 6,
  },
  {
    name: 'Eunice M',
    rating: 5,
    text: 'Am privileged to be a part of this community. Thanks for the best coaching classes. Incredible course! I now feel so confident in my trading and doing great. Thanks for the guidance, motivation and support throughout my journey.',
    date: '2 weeks ago',
    avatar: 'E',
    isVerified: true,
    likes: 19,
  },
  {
    name: 'Salma B',
    rating: 5,
    text: 'I first came across forex trading during the pandemic. There were plenty of courses online but I didn\'t know where to start. A friend recommended this platform and the way the course was divided into sections with everything I needed was answered prayer. I am currently demo trading and have built the skills to take on my first prop firm challenge.',
    date: '3 weeks ago',
    avatar: 'S',
    isVerified: true,
    likes: 11,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={16} className="fill-[#FBBC05] text-[#FBBC05]" />
      ))}
      {hasHalfStar && (
        <StarHalf size={16} className="fill-[#FBBC05] text-[#FBBC05]" />
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i} size={16} className="text-[#E0E0E0]" />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const totalRatings = reviews.length;

  return (
    <>

      {/* Hero Section - Tailored for Reviews/Testimonials */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Google Icon in Hero */}
         
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-lg">
            What Our <span className="text-primary font-script">Clients Say</span>
          </h1>
          
         
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto drop-shadow-lg">
            Join <span className="font-script text-primary font-bold">{totalRatings}+ successful traders</span> who transformed their trading journey with ForexGuru
          </p>
        
          
          <div className=" italic font-serif flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded hover:bg-accent transition transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#reviews"
              className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground border border-primary text-lg font-bold rounded hover:bg-primary/10 transition"
            >
              Read All Reviews
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#34A853"/>
              </svg>
              <span>Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#34A853"/>
              </svg>
              <span>Real Members</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#34A853"/>
              </svg>
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="min-h-screen bg-white py-8 px-4" id="reviews">
        <div className="max-w-5xl mx-auto">
          {/* Header - Google Style */}
          <div className="mb-8 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <GoogleIcon />
              <h1 className="text-2xl font-medium text-gray-900">Google Reviews</h1>
            </div>
            
            <div className="flex items-start gap-8 mt-4 flex-wrap">
              {/* Left: Average Rating */}
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900">{averageRating}</div>
                <div className="flex justify-center mt-2">
                  <StarRating rating={parseFloat(averageRating)} />
                </div>
                <div className="text-sm text-gray-600 mt-1">Google rating</div>
                <div className="text-sm text-gray-500 mt-3">
                  Based on {totalRatings} Google reviews
                </div>
              </div>

            </div>
          </div>

          {/* Sort by - Google Style */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-500">Showing {reviews.length} reviews</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <button className="text-sm font-medium text-gray-900 flex items-center gap-1">
                Most relevant
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10L12 15L17 10H7Z" fill="#5F6368"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Reviews List - Google Style */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                {/* Avatar and Name Row */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#1A73E8] rounded-full flex items-center justify-center text-white font-medium text-base flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{review.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={review.rating} />
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-gray-800 mt-3 leading-relaxed">
                      {review.text}
                    </p>
                    
                    {/* Verified Badge - Google Style */}
                    {review.isVerified && (
                      <div className="flex items-center gap-1 mt-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#34A853"/>
                        </svg>
                        <span className="text-xs text-gray-500">Verified member</span>
                      </div>
                    )}
                    
                    {/* Like/Share/Report Buttons - Google Style */}
                    <div className="flex items-center gap-6 mt-4">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition text-sm">
                        <ThumbsUp size={18} />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition text-sm">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#5F6368"/>
                        </svg>
                        <span>Share</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition text-sm">
                        <Flag size={18} />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More reviews button - Google Style */}
          <div className="mt-8 text-center">
            <button className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-[#1A73E8] hover:bg-gray-50 transition">
              Load more reviews
            </button>
          </div>

          {/* CTA Section at Bottom */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-gray-200">
            <h3 className="text-2xl font-script font-bold text-gray-900 mb-3">Ready to Write Your Success Story?</h3>
            <p className="text-gray-600 mb-6">Join hundreds of successful traders who mastered the markets with ForexGuru</p>
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition"
            >
              Start Your Journey Today
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}