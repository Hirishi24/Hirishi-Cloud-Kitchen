import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    document.documentElement.style.setProperty('--promo-banner-height', '0px');
  };

  if (!visible) return null;

  return (
    <div className="promo-banner">
      <div className="promo-banner-glow"></div>
      <div className="promo-banner-content">
        <Sparkles size={14} className="promo-sparkle" />
        <span>Use code </span>
        <span className="coupon-code">HIRISHI10</span>
        <span> for <strong>flat 10% off</strong> on orders above ₹2000!</span>
        <Sparkles size={14} className="promo-sparkle" />
      </div>
      <button className="promo-close" onClick={handleDismiss} aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
};
