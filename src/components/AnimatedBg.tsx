import React from 'react';

export const AnimatedBg: React.FC = () => {
  return (
    <div className="animated-bg">
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      {/* 5th element - subtle gold accent */}
      <div className="floating-element" style={{
        width: '35vw',
        height: '35vw',
        background: 'radial-gradient(circle, rgba(227, 209, 138, 0.08) 0%, transparent 70%)',
        top: '60%',
        right: '20%',
        animation: 'liquid-float-1 22s infinite alternate ease-in-out 5s',
        opacity: 0.4,
      }}></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      {/* Extra sparkles for premium feel */}
      <div className="sparkle" style={{ top: '35%', left: '50%', animationDelay: '5s' }}></div>
      <div className="sparkle" style={{ top: '65%', left: '15%', animationDelay: '6s' }}></div>
      <div className="sparkle" style={{ top: '10%', left: '90%', animationDelay: '7s' }}></div>
    </div>
  );
};
