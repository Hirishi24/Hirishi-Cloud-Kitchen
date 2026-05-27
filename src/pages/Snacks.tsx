import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { snacks } from '../productsData';
import type { SnackProduct } from '../productsData';

export const Snacks: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSnack, setSelectedSnack] = useState<SnackProduct | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="snacks-section">
      <button onClick={() => navigate('/menu')} className="back-button">
        <span className="arrow">←</span> Back to Menu
      </button>

      <h1 className="snacks-title">Snacks Cloud - Coming Soon!</h1>

      <div className="coming-soon-message">
        <div className="message-container">
          <div className="message-icon">🥨</div>
          <h2>Delicious Snacks Collection</h2>
          <p>We are currently focusing on delivering our premium homemade non-veg pickles.</p>
          <p>Our mouthwatering snacks will be available soon!</p>
          <button onClick={() => navigate('/pickles')} className="panda-button" style={{ border: 'none', cursor: 'pointer' }}>
            <span className="panda-emoji">🐼</span>
            Order from Pickles Cloud
          </button>
          
          <div className="animated-message">
            <span className="message-bubble">
              <span className="bubble-text">
                Customer experience is our priority! We're working hard to bring you the best homemade snacks soon! 🎉
              </span>
            </span>
            <div className="character">🧑‍🍳</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#e3d18a', fontFamily: "var(--font-title)", fontSize: '2em', marginBottom: '30px' }}>
          Preview Our Upcoming Snacks
        </h2>
        <div className="snacks-grid">
          {snacks.map((snack) => (
            <div key={snack.id} className="snack-item" onClick={() => setSelectedSnack(snack)} style={{ cursor: 'pointer' }}>
              {snack.badge && <span className="snack-badge">{snack.badge}</span>}
              <span className="snack-category">{snack.category}</span>
              <img src={`/img/${snack.image}`} alt={snack.name} className="snack-image" />
              <h3 className="snack-name">{snack.name}</h3>
              <p className="snack-description">{snack.description}</p>
              <div className="snack-price">{snack.price}</div>
              <button
                className="add-to-cart-btn"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSnack(snack);
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Snack Popup Modal */}
      {selectedSnack && (
        <>
          <div className="snack-popup-overlay show" onClick={() => setSelectedSnack(null)}></div>
          <div className="snack-popup show">
            <button className="snack-popup-close" onClick={() => setSelectedSnack(null)}>
              &times;
            </button>
            <div className="snack-popup-content">
              <img src={`/img/${selectedSnack.image}`} alt={selectedSnack.name} className="snack-popup-image" />
              <h2 className="snack-popup-title">{selectedSnack.name}</h2>
              <p className="snack-popup-description">{selectedSnack.description}</p>
              <div className="snack-popup-price">{selectedSnack.price}</div>
              <button
                className="add-to-cart-btn"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedSnack(null);
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
