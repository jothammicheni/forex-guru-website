// components/floating-whatsapp.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Phone } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options?: string[];
}

interface FloatingWhatsAppProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'name',
    question: 'Welcome to ForexGuru Trading Mentorship\n\nMay I have your name?',
    type: 'single',
    options: [],
  },
  {
    id: 'experience',
    question: 'What is your trading experience level?',
    type: 'single',
    options: [
      'Complete Beginner (Never traded before)',
      'Some Knowledge (Learning basics)',
      'Intermediate (Trading for 1-6 months)',
      'Advanced (Trading for 6+ months)',
      'Experienced (Profitable trader)',
    ],
  },
  {
    id: 'interest',
    question: 'What are you most interested in?',
    type: 'multiple',
    options: [
      'Forex Trading Education',
      'Prop Firm Challenge Preparation',
      'Trading Psychology',
      'Risk Management Strategies',
      'Live Trading Sessions',
      'One-on-One Mentorship',
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary trading goal?',
    type: 'single',
    options: [
      'Learn to trade consistently',
      'Pass a prop firm challenge',
      'Generate additional income',
      'Trade full-time professionally',
      'Master trading psychology',
    ],
  },
  {
    id: 'challenge',
    question: 'What challenge are you currently facing?',
    type: 'multiple',
    options: [
      'Consistent losses',
      'Blowing accounts',
      'Lack of strategy',
      'Poor risk management',
      'Emotional trading',
      'Finding profitable setups',
    ],
  },
  {
    id: 'contact',
    question: 'How would you like us to reach you?',
    type: 'single',
    options: [
      'WhatsApp (Recommended)',
      'Phone Call',
      'Email',
    ],
  },
];

const COMPANY_WHATSAPP = '254701519280';
const COMPANY_PHONE = '0701519280';

export function FloatingWhatsApp({ isOpen: externalIsOpen, onClose }: FloatingWhatsAppProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [textInput, setTextInput] = useState('');

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const currentQuestion = quizQuestions[currentStep];
  const isComplete = currentStep >= quizQuestions.length;

  const generateWhatsAppLink = () => {
    const name = (answers.name as string) || 'Trader';
    const experience = (answers.experience as string) || 'Not specified';
    const interest = Array.isArray(answers.interest) 
      ? answers.interest.join(', ') 
      : (answers.interest as string) || 'Not specified';
    const goal = (answers.goal as string) || 'Not specified';
    const challenge = Array.isArray(answers.challenge) 
      ? answers.challenge.join(', ') 
      : (answers.challenge as string) || 'Not specified';
    const contactMethod = (answers.contact as string) || 'WhatsApp';

    const message = `*NEW TRADING INQUIRY - ForexGuru Mentorship*

*Trader Information*
• Name: ${name}
• Experience Level: ${experience}
• Trading Goal: ${goal}
• Preferred Contact: ${contactMethod}

*Areas of Interest*
• ${interest}

*Current Challenges*
• ${challenge}

*Additional Notes*
• Trader is seeking professional mentorship
• Please provide information about available plans
• Schedule a consultation call if needed

---
*ForexGuru Trading Mentorship*
📞 Phone: ${COMPANY_PHONE}
📧 Email: support@forexguru.com
🌐 Website: https://forexguru.com`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      setIsRedirecting(false);
      handleClose();
      setTimeout(() => {
        setCurrentStep(0);
        setAnswers({});
        setTextInput('');
      }, 500);
    }, 500);
  };

  const handleAnswer = (answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (currentStep + 1 < quizQuestions.length) {
        setCurrentStep(prev => prev + 1);
        setTextInput('');
      } else {
        setIsRedirecting(true);
        generateWhatsAppLink();
      }
    }, 600);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleAnswer(textInput.trim());
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
    setCurrentStep(0);
    setAnswers({});
    setTextInput('');
    setIsRedirecting(false);
  };

  const handleOpen = () => {
    setInternalIsOpen(true);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const handleOpenWhatsApp = () => {
      setInternalIsOpen(true);
    };
    window.addEventListener('openWhatsAppModal', handleOpenWhatsApp);
    return () => window.removeEventListener('openWhatsAppModal', handleOpenWhatsApp);
  }, []);

  return (
    <>
      {/* WhatsApp Floating Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse opacity-40" />
          
          <div className="relative bg-[#25D366] hover:bg-[#20b859] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] font-bold flex items-center justify-center text-white animate-pulse">
              !
            </span>
          </div>
          
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-card text-foreground text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-border">
              Chat with our mentor
              <div className="absolute bottom-0 right-3 transform translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border"></div>
            </div>
          </div>
        </div>
      </button>

      {/* Quiz Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden animate-scale-in border border-border">
            {/* Header */}
            <div className="bg-primary px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-primary-foreground font-semibold">ForexGuru Mentor</h3>
                    <p className="text-primary-foreground/80 text-xs">Online | Usually replies in minutes</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="h-[500px] flex flex-col bg-background">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Welcome message */}
                {currentStep === 0 && Object.keys(answers).length === 0 && (
                  <div className="flex gap-2 animate-slide-in">
                    <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="relative">
                      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[280px]">
                        <p className="text-foreground text-sm whitespace-pre-line">
                          {currentQuestion.question}
                        </p>
                      </div>
                      <div className="absolute -left-1 top-0 w-3 h-3 bg-card border-l border-t border-border transform rotate-45"></div>
                    </div>
                  </div>
                )}

                {/* Previous answers */}
                {Object.entries(answers).map(([key, value]) => {
                  const question = quizQuestions.find(q => q.id === key);
                  if (!question) return null;
                  const displayValue = Array.isArray(value) ? value.join(', ') : value;
                  return (
                    <div key={key} className="flex justify-end animate-slide-in-right">
                      <div className="bg-primary/10 text-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-sm border border-primary/20">
                        <p className="text-sm">{displayValue}</p>
                      </div>
                    </div>
                  );
                })}

                {/* Current question */}
                {!isRedirecting && !isComplete && (
                  <>
                    <div className="flex gap-2 animate-slide-in">
                      <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="relative max-w-[85%]">
                        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                          <p className="text-foreground text-sm whitespace-pre-line font-medium">
                            {currentQuestion.question}
                          </p>
                          
                          {/* Name input */}
                          {currentQuestion.id === 'name' && (
                            <div className="mt-3">
                              <input
                                type="text"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder="Type your name..."
                                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-foreground placeholder-muted-foreground"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleTextSubmit();
                                  }
                                }}
                                autoFocus
                              />
                              <button
                                onClick={handleTextSubmit}
                                className="w-full mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-accent transition flex items-center justify-center gap-2"
                              >
                                <Send className="w-4 h-4" />
                                Continue
                              </button>
                            </div>
                          )}

                          {/* Phone input for contact method */}
                          {currentQuestion.id === 'contact' && (
                            <div className="mt-3 space-y-2">
                              {currentQuestion.options?.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleAnswer(option)}
                                  className="w-full text-left px-3 py-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors text-foreground text-sm border border-border"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Single select options */}
                          {currentQuestion.type === 'single' && currentQuestion.id !== 'name' && currentQuestion.id !== 'contact' && currentQuestion.options && (
                            <div className="mt-3 space-y-2">
                              {currentQuestion.options.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleAnswer(option)}
                                  className="w-full text-left px-3 py-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors text-foreground text-sm border border-border"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Multiple select options */}
                          {currentQuestion.type === 'multiple' && currentQuestion.options && (
                            <div className="mt-3 space-y-2">
                              {currentQuestion.options.map((option) => {
                                const selected = Array.isArray(answers[currentQuestion.id]) 
                                  ? (answers[currentQuestion.id] as string[]).includes(option) 
                                  : false;
                                return (
                                  <button
                                    key={option}
                                    onClick={() => {
                                      const current = Array.isArray(answers[currentQuestion.id]) 
                                        ? answers[currentQuestion.id] as string[]
                                        : [];
                                      const newSelection = selected
                                        ? current.filter((o: string) => o !== option)
                                        : [...current, option];
                                      setAnswers(prev => ({ ...prev, [currentQuestion.id]: newSelection }));
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm border ${
                                      selected
                                        ? 'bg-primary/20 text-foreground border-primary'
                                        : 'bg-secondary text-foreground border-border hover:bg-primary/10'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                              {Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).length > 0 && (
                                <button
                                  onClick={() => handleAnswer(answers[currentQuestion.id] as string[])}
                                  className="w-full mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-accent transition"
                                >
                                  Continue
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="absolute -left-1 top-0 w-3 h-3 bg-card border-l border-t border-border transform rotate-45"></div>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Redirecting message */}
                {isRedirecting && (
                  <div className="flex justify-center py-8">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-foreground">Connecting to WhatsApp...</p>
                      <p className="text-xs text-muted-foreground mt-2">One moment please</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress indicator */}
              {!isRedirecting && !isComplete && (
                <div className="px-4 py-2 border-t border-border bg-background">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Step {currentStep + 1} of {quizQuestions.length}</span>
                    <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1 mt-1">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}