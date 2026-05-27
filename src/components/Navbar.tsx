import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { cartBadgeCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img src="/img/hirishi-logo.svg" alt="Hirishi Cloud Kitchen Logo" className="logo-img" />
          <div className="navbar-title">
            <span className="brand-main">Hirishi</span>
            <span className="brand-sub">Cloud Kitchen</span>
          </div>
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/" onClick={(e) => handleNavClick(e, 'hero')}>Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/" onClick={(e) => handleNavClick(e, 'menu')}>Menu</Link>
        </li>
        <li>
          <Link to="/pickles">Pickles</Link>
        </li>
        <li>
          <Link to="/" onClick={(e) => handleNavClick(e, 'contact')}>Contact</Link>
        </li>
      </ul>

      <div className="nav-right">
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#fffbe6', fontFamily: "'Big Shoulders Text', cursive", fontSize: '1.2em' }}>
              Hi, {user.fullName}!
            </span>
            <button
              onClick={logout}
              className="login-btn"
              style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            <span className="btn-text">Login</span>
            <span className="btn-icon">→</span>
          </Link>
        )}

        <Link to="/cart" className="cart-icon-link">
          <span id="cart-badge" className="cart-badge">{cartBadgeCount}</span>
          <img src="/img/cart.png" alt="Cart" className="cart-icon-svg" style={{ width: '32px', height: '32px' }} />
        </Link>
      </div>
    </nav>
  );
};
