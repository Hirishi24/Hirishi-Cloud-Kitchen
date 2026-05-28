import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Star, Users, Package, Globe, Phone } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export const Home: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Formspree Config
  const FORMSPREE_ID = "mykvljbe"; // User's actual Formspree form ID

  // Formspree Hook
  const [state, handleFormspreeSubmit, resetFormspree] = useForm(FORMSPREE_ID);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // iPhone classic Tri-tone + Golden God Sound Hybrid Synthesizer
  const playIphoneNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.05);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.0);
      masterGain.connect(ctx.destination);

      // --- 1. iPhone Tri-tone Intro Chime ---
      // Frequencies: G5 (784Hz) -> C6 (1047Hz) -> E6 (1319Hz)
      const tritone = [
        { freq: 783.99, start: 0.0, duration: 0.15, gain: 0.28 },
        { freq: 1046.50, start: 0.08, duration: 0.15, gain: 0.28 },
        { freq: 1318.51, start: 0.16, duration: 0.35, gain: 0.35 }
      ];

      tritone.forEach((note) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.start);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.setValueAtTime(0, ctx.currentTime + note.start);
        gainNode.gain.linearRampToValueAtTime(note.gain, ctx.currentTime + note.start + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + note.start + note.duration);
        
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        osc.start(ctx.currentTime + note.start);
        osc.stop(ctx.currentTime + note.start + note.duration + 0.05);
      });

      // --- 2. Divine Angelic Choir Pad (starts playing slightly arpeggiated with a swell) ---
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(87.31, ctx.currentTime); // F2
      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.setValueAtTime(0, ctx.currentTime + 0.2);
      subGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.6);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(ctx.currentTime + 0.2);
      subOsc.stop(ctx.currentTime + 4.8);

      const chord = [174.61, 261.63, 440.00, 523.25, 659.25, 783.99]; // F Major 9
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 12, ctx.currentTime);
        
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(3.5 + Math.random() * 2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(6 + Math.random() * 4, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.detune);
        lfo.start();
        
        const delay = 0.2 + idx * 0.08;
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        
        const noteDecay = 4.5 - idx * 0.15;
        gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.4);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + noteDecay);
        
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        
        osc.start();
        osc.stop(ctx.currentTime + 5.0);
        lfo.stop(ctx.currentTime + 5.0);
      });

      // --- 3. High Sparkling Golden Bells ---
      for (let i = 0; i < 10; i++) {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        const freq = 1800 + Math.random() * 2200;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        const delay = 0.4 + i * 0.18;
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.8);
        
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        
        osc.start();
        osc.stop(ctx.currentTime + 4.0);
      }
    } catch (e) {
      console.warn("AudioContext failed to start:", e);
    }
  };

  // Trigger sound when Formspree submission succeeds
  useEffect(() => {
    if (state.succeeded) {
      playIphoneNotificationSound();
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }
  }, [state.succeeded]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    setErrorMessage('');
    // Pass the actual HTMLFormElement DOM node to prevent React 19 event recycling issues
    await handleFormspreeSubmit(e.currentTarget);
  };

  // Intersection Observer for staggered reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Parallax on hero bg
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero-bg-image') as HTMLElement;
      if (hero) hero.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reviews = [
    { stars: 5, text: '“Nethi Pootharekulu are out of this world! So thin, loaded with dry fruits, and the aroma of pure ghee is amazing. Reminds me of our native place in Atreyapuram.”', author: 'Sowmya Reddy', location: 'Hyderabad, TS' },
    { stars: 5, text: '“Being from Konaseema, I am extremely picky about Vadiyalu and sweets. But their Saggubiyyam and Minapa Vadiyalu are dried perfectly and taste exactly like our old family recipes.”', author: 'Satya Devi', location: 'Amalapuram, AP' },
    { stars: 5, text: '“The Avakaya pickle is super spicy and pungent, exactly how we make it traditionally. The raw mango pieces are still crunchy and the seed shell is there. Perfect with hot rice & ghee!”', author: 'Venkatesh Prasad', location: 'Vijayawada, AP' },
    { stars: 5, text: '“Ordered Gongura Mutton pickle and Pindi Vadiyalu to Bangalore. Arrived safely in just 2 days. The mutton pieces are so tender and juicy, and the spice level is absolutely spot on.”', author: 'Madhuri K.', location: 'Bangalore, KA' },
    { stars: 5, text: '“The Gongura Prawns pickle has the perfect level of sourness and heat. Rajahmundry has great food, but this pickle stands out. Fits perfectly with hot rice or breakfast idli!”', author: 'Sriman Narayana', location: 'Rajahmundry, AP' },
    { stars: 5, text: '“Their Majjigalo Mirapakayalu are extremely crispy and salted perfectly. Just fry them and have with simple curd rice – ultimate comfort food combination.”', author: 'Suresh Babu', location: 'Visakhapatnam, AP' },
    { stars: 5, text: '“Chicken boneless pickle is excellent. Fresh oil, clean preparation, and no chemical taste. Feels like Amma made it at home. Packing was also leak-proof.”', author: 'Swathi P.', location: 'Guntur, AP' },
  ];

  return (
    <div className="page-enter">
      {/* ===== HERO — Hirishi Logo prominently featured ===== */}
      <section className="hero" id="hero">
        <div className="hero-bg-image"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <img src="img/hirishi-logo.svg" alt="Hirishi Cloud Kitchen" className="hero-logo-badge" />
          <span className="hero-brand-name">Hirishi Cloud Kitchen</span>
          <h1 className="hero-title">
            Taste of<br />
            Amma's <span className="accent">Love</span>
          </h1>
          <p className="hero-tagline">Ammachethi Vantillu</p>
          <p className="hero-subtitle">
            Premium homemade pickles, crafted with generations-old recipes
            and delivered fresh to your doorstep — across India & Worldwide.
          </p>
          <div className="hero-cta-group">
            <Link to="/pickles" className="btn-primary">
              <Package size={20} /> Order Now
            </Link>
            <button className="btn-secondary" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Menu <ArrowDown size={16} />
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">50+</div>
              <div className="hero-stat-label"><Users size={12} /> Customers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">12+</div>
              <div className="hero-stat-label"><Package size={12} /> Products</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">4.9</div>
              <div className="hero-stat-label"><Star size={12} /> Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENU BENTO GRID ===== */}
      <section className="section" id="menu">
        <div className="reveal">
          <span className="section-label">Our Clouds</span>
          <h2 className="section-title">What We Serve</h2>
          <div className="section-divider"></div>
        </div>

        <div className="category-pills reveal">
          <Link to="/pickles" className="category-pill active">🥒 All Pickles</Link>
          <Link to="/pickles" className="category-pill">🍗 Non-Veg Pickles</Link>
          <Link to="/pickles" className="category-pill">🌿 Veg Pickles</Link>
          <Link to="/sweets" className="category-pill">🍯 Sweets</Link>
          <Link to="/snacks" className="category-pill">🍿 Snacks</Link>
        </div>

        <div className="bento-grid reveal">
          <Link to="/pickles" className="bento-card large" style={{ textDecoration: 'none' }}>
            <img src="img/Prawns Pickle.webp" alt="Pickles Cloud" className="bento-card-img" />
            <div className="bento-card-overlay"></div>
            <span className="bento-card-arrow">→</span>
            <div className="bento-card-content">
              <div className="bento-card-emoji">🥒</div>
              <div className="bento-card-title">Pickles Cloud</div>
              <div className="bento-card-subtitle">12+ authentic varieties • Order Now</div>
            </div>
          </Link>
          <Link to="/sweets" className="bento-card" style={{ textDecoration: 'none' }}>
            <img src="img/sweets-cloud.png" alt="Sweets Cloud" className="bento-card-img" />
            <div className="bento-card-overlay"></div>
            <span className="bento-card-arrow">→</span>
            <div className="bento-card-content">
              <div className="bento-card-emoji">🍯</div>
              <div className="bento-card-title">Sweets Cloud</div>
              <div className="bento-card-subtitle">Traditional Nethi Pootharekulu & more • Order Now</div>
            </div>
          </Link>
          <Link to="/snacks" className="bento-card" style={{ textDecoration: 'none' }}>
            <img src="img/snacks-cloud.png" alt="Snacks Cloud" className="bento-card-img" />
            <div className="bento-card-overlay"></div>
            <span className="bento-card-arrow">→</span>
            <div className="bento-card-content">
              <div className="bento-card-emoji">🍿</div>
              <div className="bento-card-title">Snacks Cloud</div>
              <div className="bento-card-subtitle">Traditional Telugu Vadiyalu & savories • Order Now</div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section" id="about">
        <div className="reveal">
          <span className="section-label">Our Story</span>
          <h2 className="section-title">Made with Love</h2>
          <div className="section-divider"></div>
        </div>
        <div className="about-grid reveal">
          <div className="about-image-wrapper">
            <img src="img/Mother-Child.svg" alt="Satya and Hirishi — Mother and Child" />
          </div>
          <div className="about-text">
            <h3>From Our Kitchen to Yours</h3>
            <p>
              Satya Saladi, a mother with a passion for authentic flavors, and her son Hirishi, 
              combined their love for traditional cooking with a modern vision. What started as 
              a small family tradition has blossomed into Hirishi Cloud Kitchen.
            </p>
            <p>
              Every recipe carries the warmth of our home. From signature pickles to homemade 
              snacks — prepared with the same care we give our own family.
            </p>
            <Link to="/about" className="btn-secondary" style={{ maxWidth: '220px' }}>
              Read Our Story →
            </Link>
          </div>
        </div>

        <div className="founders-row reveal">
          <div className="founder-card">
            <img src="img/satya.png" alt="Satya Saladi" className="founder-avatar" />
            <div className="founder-name">Satya Saladi</div>
            <div className="founder-role">The Heart of Our Kitchen</div>
            <p className="founder-quote">"Every recipe I create is a piece of my heart, made with love and tradition."</p>
          </div>
          <div className="founder-card">
            <img src="img/hirishi.png" alt="Hirishi" className="founder-avatar" />
            <div className="founder-name">Hirishi</div>
            <div className="founder-role">The Vision Behind Hirishi</div>
            <p className="founder-quote">"Bringing my mother's amazing recipes to people across India is my dream."</p>
          </div>
        </div>
      </section>

      {/* ===== RATINGS ===== */}
      <section className="section" id="ratings">
        <div className="reveal">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="section-divider"></div>
        </div>
        <div className="ratings-scroll reveal">
          {reviews.map((r, i) => (
            <div className="rating-card" key={i}>
              <div className="rating-stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} fill={j < r.stars ? 'currentColor' : 'none'} style={{ display: 'inline-block' }} />
                ))}
              </div>
              <p className="rating-text">{r.text}</p>
              <div className="rating-author">{r.author}</div>
              <div style={{ fontSize: '0.75em', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Globe size={12} /> {r.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section" id="contact">
        <div className="reveal">
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <div className="section-divider"></div>
        </div>
        <div className="contact-grid reveal">
          <div className="contact-form-container">
            {/* Liquid-Glass Success Overlay */}
            <div className={`form-success-overlay ${state.succeeded ? 'active' : ''}`}>
              <div className="success-sparkles">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`sparkle sparkle-${i}`} />
                ))}
              </div>
              <div className="godly-halo"></div>
              <div className="success-checkmark-circle">
                <svg className="success-checkmark-svg" viewBox="0 0 52 52">
                  <circle className="success-checkmark-circle-path" cx="26" cy="26" r="25" fill="none" />
                  <path className="success-checkmark-check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>
              <h3 className="success-title">Message Sent!</h3>
              <p className="success-subtitle">Hirishi Cloud Kitchen has received your message. A confirmation email is on its way!</p>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ marginTop: '20px', minWidth: '150px' }} 
                onClick={() => {
                  if (typeof resetFormspree === 'function') {
                    resetFormspree();
                  }
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
              >
                Send Another
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input 
                  className="form-input" 
                  name="name"
                  placeholder="Your Name *" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={state.submitting}
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input 
                  className="form-input" 
                  type="email" 
                  name="email"
                  placeholder="Email Address *" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={state.submitting}
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="form-error-banner"
                  style={{ marginTop: '4px', background: 'none', border: 'none', padding: '0', color: '#ff8b94' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input 
                  className="form-input" 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={state.submitting}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <textarea 
                  className="form-textarea" 
                  name="message"
                  placeholder="Your Message *"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={state.submitting}
                ></textarea>
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="form-error-banner"
                  style={{ marginTop: '4px', background: 'none', border: 'none', padding: '0', color: '#ff8b94' }}
                />
              </div>
              
              {(errorMessage || state.errors) && (
                <div className="form-error-banner">
                  <span style={{ marginRight: '6px' }}>⚠️</span> 
                  {errorMessage || (state.errors && state.errors.getFormErrors && state.errors.getFormErrors().length > 0 ? (
                    <ValidationError 
                      errors={state.errors} 
                      style={{ display: 'inline', color: 'inherit', background: 'none', border: 'none', padding: 0, margin: 0 }} 
                    />
                  ) : 'There was an issue submitting your message. Please check the fields above.')}
                </div>
              )}

              <button 
                type="submit" 
                className={`btn-primary ${state.submitting ? 'loading' : ''}`}
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <>
                    <span className="spinner"></span> Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
          <div className="contact-info-card">
            <div className="contact-item">
              <div className="contact-item-icon"><Phone size={20} /></div>
              <div className="contact-item-text">
                <strong>Phone</strong>
                <a href="tel:+919441317724">+91 944 131 7724</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">💬</div>
              <div className="contact-item-text">
                <strong>WhatsApp</strong>
                <a href="https://wa.me/919441317724" target="_blank" rel="noopener noreferrer">Chat with us</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <div className="contact-item-text">
                <strong>Email</strong>
                <a href="mailto:hck@hirishi.com">hck@hirishi.com</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon"><Globe size={20} /></div>
              <div className="contact-item-text">
                <strong>Delivery</strong>
                All India + International Shipping
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
