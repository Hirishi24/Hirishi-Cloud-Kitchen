import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm, ValidationError } from '@formspree/react';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, handleFormSubmit] = useForm('mykvljbe');

  // Scroll to hash section if present in URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure render is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleScrollCueClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rating State
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; emoji: string } | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const feedbackMessages: { [key: number]: { text: string; emoji: string } } = {
    1: { text: "We're sorry to hear that. Please let us know how we can improve!", emoji: "😔" },
    2: { text: "We apologize for the experience. We'll do better!", emoji: "😕" },
    3: { text: "Thank you for your feedback. We're working to improve!", emoji: "😐" },
    4: { text: "We're glad you had a decent experience!", emoji: "🙂" },
    5: { text: "Thanks for the feedback! We're getting there!", emoji: "😊" },
    6: { text: "We're happy you enjoyed your experience!", emoji: "😄" },
    7: { text: "Great! We're glad you liked it!", emoji: "😃" },
    8: { text: "Excellent! We're thrilled you had a great time!", emoji: "😁" },
    9: { text: "Amazing! We're overjoyed with your rating!", emoji: "🤩" },
    10: { text: "Perfect! You made our day! Thank you!", emoji: "🥳" }
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setFeedback(feedbackMessages[rating]);
    setShowThankYou(true);
    setShowConfetti(true);

    // Hide thank you message after 4 seconds
    setTimeout(() => {
      setShowThankYou(false);
      setShowConfetti(false);
    }, 4000);
  };

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero-layout-full">
        <div className="hero-container">
          <div className="hero-content-centered">
            <h1 className="hero-title">Hirishi Cloud Kitchen</h1>
            <p className="hero-tagline">Taste of Amma's Love</p>
            <div className="hero-cta-wrapper-centered">
              <div className="hero-cta-container">
                <div className="dancing-panda-container">
                  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="dancing-panda">
                    {/* Panda body */}
                    <ellipse cx="45" cy="55" rx="22" ry="20" fill="#fff" stroke="#1b3c3d" stroke-width="2"/>
                    {/* Panda ears */}
                    <ellipse cx="25" cy="40" rx="7" ry="8" fill="#1b3c3d"/>
                    <ellipse cx="65" cy="40" rx="7" ry="8" fill="#1b3c3d"/>
                    {/* Panda eyes */}
                    <ellipse cx="37" cy="58" rx="4" ry="5" fill="#1b3c3d"/>
                    <ellipse cx="53" cy="58" rx="4" ry="5" fill="#1b3c3d"/>
                    <ellipse cx="37" cy="60" rx="1.2" ry="1.5" fill="#fff"/>
                    <ellipse cx="53" cy="60" rx="1.2" ry="1.5" fill="#fff"/>
                    {/* Panda nose */}
                    <ellipse cx="45" cy="65" rx="2.2" ry="1.2" fill="#1b3c3d"/>
                    {/* Panda smile */}
                    <path d="M42 68 Q45 70 48 68" stroke="#1b3c3d" stroke-width="1.5" fill="none"/>
                    {/* Pointing arm */}
                    <path className="panda-arm pointing" d="M65 55 Q75 50 85 45" stroke="#1b3c3d" stroke-width="2" fill="none"/>
                    {/* Other arm */}
                    <path className="panda-arm left" d="M25 55 Q20 45 15 50" stroke="#1b3c3d" stroke-width="2" fill="none"/>
                    {/* Dancing legs */}
                    <path className="panda-leg left" d="M35 75 Q30 85 25 80" stroke="#1b3c3d" stroke-width="2" fill="none"/>
                    <path className="panda-leg right" d="M55 75 Q60 85 65 80" stroke="#1b3c3d" stroke-width="2" fill="none"/>
                  </svg>
                </div>
                <a href="https://wa.me/919441317724" className="hero-cta" target="_blank" rel="noopener noreferrer">Order through WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="hero-illustration">
            <img src="img/Mother-Child.svg" alt="Mother and Child Illustration" className="amma-illustration" />
          </div>
        </div>
        <div className="scroll-indicator" onClick={handleScrollCueClick}>
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
          <span className="scroll-arrow"></span>
        </div>
      </section>

      {/* About / Cloud Note Section */}
      <section id="about" className="about-section">
        <div className="about-home-content">
          <div className="about-text reveal-on-scroll reveal-left">
            <h2>Cloud Note</h2>
            <p>Hirishi Cloud Kitchen brings you the authentic taste of home-cooked food, made with love and care, just like Amma's kitchen. We deliver delicious pickles, snacks, sweets, and more, all prepared fresh at home and delivered across India & worldwide (International Delivery Available). Experience the warmth and tradition in every bite!</p>
            <div style={{ marginTop: '20px' }}>
              <Link to="/about" className="hero-cta">Read Our Story</Link>
            </div>
          </div>
          <div className="about-image reveal-on-scroll reveal-right">
            {/* Illustration now used as background or show image */}
            <img src="img/hirishi-logo.svg" alt="Hirishi Cloud Kitchen Logo" style={{ maxWidth: '100%', borderRadius: '15px', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)', background: 'rgba(255, 251, 230, 0.05)' }} />
          </div>
        </div>
      </section>

      {/* Menu Grid Section */}
      <section id="menu" className="menu-section">
        <h2 className="menu-title reveal-on-scroll">Our Menu</h2>
        <div className="menu-grid">
          <Link to="/pickles" className="menu-item menu-link reveal-on-scroll reveal-left">
            <div className="menu-tooltip">Tap to view Pickles Cloud menu!</div>
            <img src="img/pickles.svg" alt="Homemade Pickles" />
            <span>Pickles Cloud</span>
          </Link>
          <Link to="/sweets" className="menu-item menu-link reveal-on-scroll">
            <div className="menu-tooltip">Tap to view Sweets Cloud menu!</div>
            <img src="img/Sweets.svg" alt="Homemade Sweets" />
            <span>Sweets Cloud</span>
          </Link>
          <Link to="/snacks" className="menu-item menu-link reveal-on-scroll reveal-right">
            <div className="menu-tooltip">Tap to view Snacks Cloud menu!</div>
            <img src="img/Snacks.svg" alt="Snacks" />
            <span>Snacks Cloud</span>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="reveal-on-scroll">Contact & Order</h2>
        <div className="contact-grid">
          <div className="contact-info-column reveal-on-scroll reveal-left">
            <div className="contact-details">
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <img src="img/Whatsapp-icon.png" alt="WhatsApp" className="contact-icon" />
                </div>
                <a href="https://wa.me/919441317724" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="number">+91 944 131 7724</span>
                </a>
              </div>
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <img src="img/Gmail.width-500.format-webp.webp" alt="Gmail" className="contact-icon" />
                </div>
                <a href="mailto:hck@hirishi.com?subject=Inquiry from Hirishi Cloud Kitchen Website" className="contact-link">
                  <span className="email">hck@hirishi.com</span>
                </a>
              </div>
              <div className="contact-method">
                <div className="contact-icon-wrapper">
                  <img src="img/instagram-icon.png" alt="Instagram" className="contact-icon" />
                </div>
                <a href="https://instagram.com/hirishicloudkitchen" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="social-handle">@hirishicloudkitchen</span>
                </a>
              </div>
            </div>
            <p className="contact-note">We deliver all over India & worldwide (International Delivery Available). All food is made fresh at home and shipped with love!</p>
          </div>

          <div className="contact-form-column reveal-on-scroll reveal-right">
            <div className="contact-form-container">
              {formState.succeeded ? (
                <div className="form-success-card">
                  <div className="success-lottie-container">
                    <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                      <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                  <div className="success-particles">
                    {[...Array(12)].map((_, i) => (
                      <span key={i} className="success-particle" style={{ '--rotation': `${i * 30}deg` } as React.CSSProperties}></span>
                    ))}
                  </div>
                  <div className="success-glow-ring"></div>
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-text">Your inquiry has been received with love. We'll get back to you within 24 hours!</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="contact-form">
                  <h3>Send us an Inquiry</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" required placeholder="Enter your name" />
                    <ValidationError prefix="Name" field="name" errors={formState.errors} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email" />
                    <ValidationError prefix="Email" field="email" errors={formState.errors} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Mobile Number</label>
                    <input type="tel" id="phone" name="phone" required placeholder="Enter your mobile number" />
                    <ValidationError prefix="Phone" field="phone" errors={formState.errors} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message / Inquiry Details</label>
                    <textarea id="message" name="message" required placeholder="What pickles, sweets, or snacks would you like to order? Or ask us anything!" />
                    <ValidationError prefix="Message" field="message" errors={formState.errors} />
                  </div>
                  
                  <button type="submit" disabled={formState.submitting}>
                    {formState.submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Rating Section */}
      <section className="customer-rating-section">
        <div className="rating-container">
          <div className="rating-header reveal-on-scroll reveal-left">
            <h2>Our First Happy Customer</h2>
            <div className="rating-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
          </div>
          <div className="rating-card reveal-on-scroll reveal-right">
            <div className="customer-info">
              <div className="customer-avatar">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" fill="#fffbe6" stroke="#e3d18a" stroke-width="2"/>
                  <path d="M30 32C35.5228 32 40 27.5228 40 22C40 16.4772 35.5228 12 30 12C24.4772 12 20 16.4772 20 22C20 27.5228 24.4772 32 30 32Z" fill="#e3d18a"/>
                  <path d="M12 48C12 40.268 20.268 34 30 34C39.732 34 48 40.268 48 48" stroke="#e3d18a" stroke-width="2"/>
                </svg>
              </div>
              <div className="customer-details">
                <h3>Upendra Reddy</h3>
                <p className="location">Kurnool, Andhra Pradesh</p>
              </div>
            </div>
            <div className="order-details">
              <div className="order-summary">
                <h4>Order Summary</h4>
                <p>5 Types of Pickles</p>
                <p className="total-weight">Total: 6.5 kg</p>
              </div>
              <div className="rating-message show">
                <div className="rating-quote">
                  <span className="quote-mark">“</span>
                  <p className="animated-text">Amazing taste and quality! Will definitely order again!</p>
                  <span className="quote-mark">”</span>
                </div>
                <div className="rating-emoji">😋</div>
                <p className="rating-note">We'll get back to you within 24 hours!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Rating Scale Section */}
      <section className="rating-scale-section" style={{ position: 'relative' }}>
        {showConfetti && (
          <div className="confetti" id="confetti" style={{ pointerEvents: 'none' }}>
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 90 + 5}%`,
                  background: ['#e3d18a', '#fffbe6', '#1b3c3d', '#f7c873'][i % 4],
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="rating-scale-container reveal-on-scroll">
          <div className="rating-scale-header">
            <h2>Rate Your Experience</h2>
            <p className="rating-subtitle">Help us serve you better!</p>
          </div>
          <div className="rating-scale">
            {user ? (
              <div style={{ width: '100%' }}>
                <div className="rating-numbers-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
                  {[...Array(10)].map((_, i) => {
                    const val = i + 1;
                    return (
                      <button
                        key={val}
                        className={`rating-number-btn ${selectedRating === val ? 'active' : ''}`}
                        onClick={() => handleRatingClick(val)}
                        style={{
                          width: '45px',
                          height: '45px',
                          borderRadius: '50%',
                          border: '2px solid #e3d18a',
                          background: selectedRating === val ? '#1b3c3d' : '#fffbe6',
                          color: selectedRating === val ? '#fffbe6' : '#1b3c3d',
                          fontFamily: "var(--font-title)",
                          fontSize: '1.3em',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>

                {feedback && (
                  <div className="rating-message show" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '2em' }}>{feedback.emoji}</span>
                      <p style={{ margin: 0, fontFamily: "var(--font-title)", fontSize: '1.2em', color: 'var(--color-gold)' }}>
                        {feedback.text}
                      </p>
                    </div>
                  </div>
                )}

                {showThankYou && (
                  <div className="thank-you-message" style={{ marginTop: '15px' }}>
                    <div className="thank-you-content">
                      <span className="thank-you-emoji">🎉</span>
                      <p>Thank you for your feedback!</p>
                      <p className="thank-you-sub">Your rating helps us improve our service.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rating-numbers" style={{ justifyContent: 'center' }}>
                <div className="login-prompt">
                  <svg width="60" height="60" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="login-prompt-mascot">
                    <ellipse cx="45" cy="55" rx="22" ry="20" fill="#fff" stroke="#e3d18a" stroke-width="2"/>
                    <ellipse cx="25" cy="40" rx="7" ry="8" fill="#e3d18a"/>
                    <ellipse cx="65" cy="40" rx="7" ry="8" fill="#e3d18a"/>
                    <ellipse cx="37" cy="58" rx="4" ry="5" fill="#1b3c3d"/>
                    <ellipse cx="53" cy="58" rx="4" ry="5" fill="#1b3c3d"/>
                    <ellipse cx="37" cy="60" rx="1.2" ry="1.5" fill="#fff"/>
                    <ellipse cx="53" cy="60" rx="1.2" ry="1.5" fill="#fff"/>
                    <ellipse cx="45" cy="65" rx="2.2" ry="1.2" fill="#1b3c3d"/>
                    <path d="M42 68 Q45 70 48 68" stroke="#1b3c3d" stroke-width="1.5" fill="none"/>
                  </svg>
                  <p className="login-prompt-text">Please login to rate your experience!</p>
                  <button onClick={() => navigate('/login')} className="login-prompt-btn" style={{ border: 'none', cursor: 'pointer' }}>
                    Login Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bulk Order Email Section */}
      <section className="email-contact-section">
        <div className="email-container reveal-on-scroll">
          <div className="email-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="#e3d18a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="#e3d18a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div className="email-content">
            <h3>For Bulk Orders & Inquiries</h3>
            <div className="email-wrapper">
              <a href="mailto:hck@hirishi.com?subject=Bulk Order Inquiry" className="email-link">
                <span className="email-text">hck@hirishi.com</span>
                <span className="email-arrow">→</span>
              </a>
            </div>
            <p className="email-note">We'll get back to you within 24 hours</p>
          </div>
        </div>
      </section>
    </>
  );
};
