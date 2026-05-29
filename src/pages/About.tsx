import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';

export const About: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-enter" style={{ padding: '90px 0 40px' }}>
      <div className="section">
        <Link to="/" className="back-btn"><ArrowLeft size={16} /> Back to Home</Link>

        <div className="reveal">
          <span className="section-label">About Hirishi</span>
          <h1 className="section-title">Our Story</h1>
          <div className="section-divider"></div>
        </div>

        <div className="about-grid reveal">
          <div className="about-image-wrapper">
            <img src="img/Mother-Child.svg" alt="Satya and Hirishi" />
          </div>
          <div className="about-text">
            <h3>From Our Kitchen to Yours</h3>
            <p>
              In the heart of our home kitchen, a beautiful journey began. Satya Saladi, a mother with a passion for authentic flavors, and her son Hirishi, combined their love for traditional cooking with a modern vision.
            </p>
            <p>
              What started as a small family tradition of making pickles and snacks has blossomed into Hirishi Cloud Kitchen — a celebration of homemade goodness delivered right to your doorstep.
            </p>
            <p>
              The name "Hirishi" is a blend of our names — a perfect representation of our mother-son partnership. Every recipe we create carries the warmth of our home and the love we put into our cooking.
            </p>
          </div>
        </div>

        <div className="founders-row reveal" style={{ marginTop: '64px' }}>
          <div className="founder-card">
            <img src="img/satya.png" alt="Satya Saladi" className="founder-avatar" />
            <div className="founder-name">Satya Saladi</div>
            <div className="founder-role">The Heart of Our Kitchen</div>
            <p className="founder-quote">"Every recipe I create is a piece of my heart, made with love and tradition. I want to share the authentic taste of home with everyone."</p>
          </div>
          <div className="founder-card">
            <img src="img/hirishi.png" alt="Hirishi" className="founder-avatar" />
            <div className="founder-name">Hirishi</div>
            <div className="founder-role">The Vision Behind Hirishi</div>
            <p className="founder-quote">"Bringing my mother's amazing recipes to people across India is my dream. Every order we receive is a chance to share our family's love for food."</p>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: '64px', textAlign: 'center' }}>
          <span className="section-label"><Heart size={14} style={{ display: 'inline' }} /> Our Mission</span>
          <h2 className="section-title" style={{ maxWidth: '600px', margin: '0 auto 24px' }}>Sharing Love Through Food</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 32px', lineHeight: '1.8' }}>
            At Hirishi Cloud Kitchen, we're not just selling food — we're sharing a piece of our home with you. We believe that food made with love and care can bring joy to people's lives, and we're committed to maintaining the highest standards of quality and hygiene.
          </p>
          <Link to="/" state={{ scrollTo: 'menu' }} className="btn-primary" style={{ maxWidth: '280px', margin: '0 auto', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} /> Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  );
};
