import React, { useEffect } from 'react';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  // Lock body scroll while welcome modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="welcome-modal show">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose} aria-label="Close welcome message">
          &times;
        </button>
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div className="modal-logo-wrapper">
            <img
              src="img/hirishi-logo.svg"
              alt="Welcome to Hirishi Cloud Kitchen"
              className="modal-logo-img"
            />
          </div>
        </div>
        <h2 className="modal-title">Welcome to Hirishi Cloud Kitchen</h2>
        <p className="modal-text">Experience the authentic taste of tradition, made with love and care.</p>
        <div style={{ textAlign: 'center' }}>
          <button
            className="hero-cta"
            onClick={onClose}
            style={{ border: 'none', cursor: 'pointer' }}
          >
            Explore Menu
          </button>
        </div>
      </div>
    </div>
  );
};

