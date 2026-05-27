import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sweets } from '../productsData';
import type { SweetProduct } from '../productsData';

export const Sweets: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSweet, setSelectedSweet] = useState<SweetProduct | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="sweets-section">
      <button onClick={() => navigate('/menu')} className="back-button">
        <span className="arrow">←</span> Back to Menu
      </button>

      <h1 className="sweets-title">Sweets Cloud - Coming Soon!</h1>
      
      <div className="coming-soon-message">
        <div className="message-container">
          <div className="message-icon">🍯</div>
          <h2>Premium Homemade Sweets</h2>
          <p>We are currently focusing on delivering our premium homemade non-veg pickles.</p>
          <p>Our delicious sweets collection will be available soon!</p>
          <button onClick={() => navigate('/pickles')} className="panda-button" style={{ border: 'none', cursor: 'pointer' }}>
            <span className="panda-emoji">🐼</span>
            Order from Pickles Cloud
          </button>
          
          <div className="animated-message">
            <span className="message-bubble">
              <span className="bubble-text">
                Customer experience is our priority! We're working hard to bring you the best homemade sweets soon! 🎉
              </span>
            </span>
            <div className="character">🧑‍🍳</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#e3d18a', fontFamily: "var(--font-title)", fontSize: '2em', marginBottom: '30px' }}>
          Preview Our Upcoming Sweets
        </h2>
        <div className="sweets-grid">
          {sweets.map((sweet) => (
            <div key={sweet.id} className="sweet-item" onClick={() => setSelectedSweet(sweet)} style={{ cursor: 'pointer' }}>
              {sweet.badge && <span className="sweet-badge">{sweet.badge}</span>}
              <img src={`/img/${sweet.image}`} alt={sweet.name} className="sweet-image" />
              <h3 className="sweet-name">{sweet.name}</h3>
              <p className="sweet-description">{sweet.description}</p>
              <div className="sweet-price">{sweet.price}</div>
              <button
                className="add-to-cart-btn"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSweet(sweet);
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sweet Popup Modal */}
      {selectedSweet && (
        <>
          <div className="sweet-popup-overlay show" onClick={() => setSelectedSweet(null)}></div>
          <div className="sweet-popup show">
            <button className="sweet-popup-close" onClick={() => setSelectedSweet(null)}>
              &times;
            </button>
            <div className="sweet-popup-content">
              <img src={`/img/${selectedSweet.image}`} alt={selectedSweet.name} className="sweet-popup-image" />
              <h2 className="sweet-popup-title">{selectedSweet.name}</h2>
              <p className="sweet-popup-description">{selectedSweet.description}</p>
              <div className="sweet-popup-price">{selectedSweet.price}</div>
              <button
                className="add-to-cart-btn"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedSweet(null);
                  navigate('/pickles');
                }}
              >
                Explore Pickles In The Meantime
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
