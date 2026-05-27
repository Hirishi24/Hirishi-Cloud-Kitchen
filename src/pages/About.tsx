import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="about-hero">
      <div className="about-content">
        <div className="story-section">
          <h2>Our Story</h2>
          <p>
            In the heart of our home kitchen, a beautiful journey began. Satya Saladi, a mother with a passion for authentic flavors, and her son Hirishi, combined their love for traditional cooking with a modern vision. What started as a small family tradition of making pickles and snacks has blossomed into Hirishi Cloud Kitchen - a celebration of homemade goodness delivered right to your doorstep.
          </p>
          <p>
            The name "Hirishi" is a blend of our names - a perfect representation of our mother-son partnership. Every recipe we create carries the warmth of our home and the love we put into our cooking. From our signature pickles to our homemade snacks, each item is prepared with the same care and attention that we would give to our own family.
          </p>
        </div>

        <div className="founder-section">
          <div className="founder-card">
            <img src="img/satya.png" alt="Satya Saladi" className="founder-image" />
            <h3 className="founder-name">Satya Saladi</h3>
            <p className="founder-role">The Heart of Our Kitchen</p>
            <p className="founder-quote">
              "Every recipe I create is a piece of my heart, made with love and tradition. I want to share the authentic taste of home with everyone."
            </p>
          </div>
          <div className="founder-card">
            <img src="img/hirishi.png" alt="Hirishi" className="founder-image" />
            <h3 className="founder-name">Hirishi</h3>
            <p className="founder-role">The Vision Behind Hirishi</p>
            <p className="founder-quote">
              "Bringing my mother's amazing recipes to people across India is my dream. Every order we receive is a chance to share our family's love for food."
            </p>
          </div>
        </div>

        <div className="mission-section">
          <h3 className="mission-title">Our Mission</h3>
          <p className="mission-text">
            At Hirishi Cloud Kitchen, we're not just selling food - we're sharing a piece of our home with you. Our mission is to bring the authentic taste of homemade goodness to every household in India. We believe that food made with love and care can bring joy to people's lives, and we're committed to maintaining the highest standards of quality and hygiene in everything we prepare.
          </p>
        </div>

        <div className="cta-section">
          <button onClick={() => navigate('/pickles')} className="cta-button">
            Explore Our Products
          </button>
        </div>
      </div>
    </section>
  );
};

