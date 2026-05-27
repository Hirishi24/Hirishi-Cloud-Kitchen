import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <div className="promo-banner">
      <div className="promo-content">
        <span className="promo-icon">🎉</span>
        <span className="promo-text">
          Use code <span className="coupon-code">HIRISHI10</span> for flat 10% off on orders above ₹2000!
        </span>
        <span className="promo-icon">🎉</span>
      </div>
    </div>
  );
};
