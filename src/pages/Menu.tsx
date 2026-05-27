import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Menu: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="menu-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 className="menu-title">Our Menu</h2>
      <div className="menu-grid">
        <Link to="/pickles" className="menu-item menu-link">
          <div className="menu-tooltip">Tap to view Pickles Cloud menu!</div>
          <img src="img/pickles.svg" alt="Homemade Pickles" />
          <span>Pickles Cloud</span>
        </Link>
        <Link to="/sweets" className="menu-item menu-link">
          <div className="menu-tooltip">Tap to view Sweets Cloud menu!</div>
          <img src="img/Sweets.svg" alt="Homemade Sweets" />
          <span>Sweets Cloud</span>
        </Link>
        <Link to="/snacks" className="menu-item menu-link">
          <div className="menu-tooltip">Tap to view Snacks Cloud menu!</div>
          <img src="img/Snacks.svg" alt="Snacks" />
          <span>Snacks Cloud</span>
        </Link>
      </div>
    </section>
  );
};
