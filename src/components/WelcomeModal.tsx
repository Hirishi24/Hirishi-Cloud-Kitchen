import React, { useEffect, useState, useCallback } from 'react';

interface Props { onClose: () => void; }

export const WelcomeModal: React.FC<Props> = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Cinematic luxury slow-to-fast loading percentage ticker (Cartier style)
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate variable luxury speed steps
      if (currentProgress < 30) {
        currentProgress += Math.floor(Math.random() * 4) + 1;
      } else if (currentProgress < 75) {
        currentProgress += Math.floor(Math.random() * 8) + 2;
      } else if (currentProgress < 99) {
        currentProgress += 1;
      } else {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 35);

    return () => {
      document.body.style.overflow = '';
      clearInterval(interval);
    };
  }, []);

  const handleEnter = useCallback(() => {
    setIsLeaving(true);
    // Smooth timing sync with the camera aperture iris exit scale transition
    const transitionTimer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(transitionTimer);
  }, [onClose]);

  // Quiet luxury automatic entry after 2.5 seconds once loading completes
  useEffect(() => {
    if (isLoaded && !isLeaving) {
      const autoTimer = setTimeout(() => {
        handleEnter();
      }, 2500); // 2.5 seconds elegant duration
      return () => clearTimeout(autoTimer);
    }
  }, [isLoaded, isLeaving, handleEnter]);

  return (
    <div 
      className={`welcome-cartier-screen ${isLeaving ? 'exit' : ''} ${isLoaded ? 'loaded' : ''}`} 
      aria-modal="true" 
      role="dialog"
    >
      {/* Immersive cinematic background with slow Ken Burns scale zoom */}
      <div className="cartier-bg-container">
        <div className="cartier-bg-image"></div>
        <div className="cartier-bg-overlay"></div>
      </div>

      {/* Cinematic Golden Background Ambient Glow */}
      <div className="cartier-glow-halo"></div>

      <div className="cartier-content-wrapper">
        {/* VIP Gold Emblem Seal */}
        <span className="cartier-seal">
          ATELIER OF IMPERIAL FLAVORS
        </span>

        {/* Minimalist brand logo with gentle hover/pulse glow */}
        <div className="cartier-logo-box">
          <img src="img/hirishi-logo.svg" alt="Hirishi Cloud Kitchen Logo" className="cartier-logo" />
        </div>

        {/* Breathtaking Cartier-inspired Roman Serif Headers */}
        <div className="cartier-brand-block">
          <h1 className="cartier-brand-title">HIRISHI</h1>
          <h2 className="cartier-brand-subtitle">CLOUD KITCHEN</h2>
          <div className="cartier-divider"></div>
        </div>

        {/* Cursive Tagline Accent */}
        <p className="cartier-tagline">
          Taste of Amma's Love
        </p>

        {/* The Luxury Percentage Ticker */}
        {!isLoaded && (
          <div className="cartier-loader-block">
            <span className="cartier-loader-percentage">
              {progress.toString().padStart(2, '0')}%
            </span>
            <div className="cartier-loader-line-track">
              <div className="cartier-loader-line-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* High-end "Enter Experience" CTA Link, fading in only when loaded */}
        {isLoaded && (
          <div className="cartier-actions-block">
            <button className="cartier-enter-btn" onClick={handleEnter}>
              ENTER THE EXPERIENCE
            </button>
          </div>
        )}

        {/* Quiet luxury footer */}
        <p className="cartier-footer">
          ESTABLISHED 2024 • AMMA'S CULINARY CLASSICS
        </p>
      </div>
    </div>
  );
};
