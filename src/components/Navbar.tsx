import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { cartBadgeCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-logo">
          <Link to="/" className="logo-link" onClick={handleLinkClick}>
            <img src="img/hirishi-logo.svg" alt="Hirishi Cloud Kitchen Logo" className="logo-img" />
            <div className="navbar-title">
              <span className="brand-main">Hirishi</span>
              <span className="brand-sub">Cloud Kitchen</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
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
          {/* Desktop auth */}
          <div className="nav-auth-desktop">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="nav-user-greeting">
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
              <Link to="/login" className="login-btn" onClick={handleLinkClick}>
                <span className="btn-text">Login</span>
                <span className="btn-icon">→</span>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="cart-icon-link"
            aria-label="Open cart"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, outline: 'none' }}
          >
            <span id="cart-badge" className={`cart-badge ${cartBadgeCount > 0 ? 'cart-badge-pulse' : ''}`}>{cartBadgeCount}</span>
            <img src="img/cart.png" alt="Cart" className="cart-icon-svg" style={{ width: '32px', height: '32px' }} />
          </button>

          {/* Hamburger Button (Mobile) */}
          <button
            className={`hamburger-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'show' : ''}`}>
        <div className={`mobile-menu-panel ${mobileMenuOpen ? 'show' : ''}`}>
          <div className="mobile-menu-header">
            <img src="img/hirishi-logo.svg" alt="Logo" className="mobile-menu-logo" />
            <div>
              <span className="brand-main" style={{ fontSize: '1.3em' }}>Hirishi</span>
              <br />
              <span className="brand-sub" style={{ fontSize: '0.85em' }}>Cloud Kitchen</span>
            </div>
          </div>
          <ul className="mobile-menu-links">
            <li style={{ '--delay': '0.05s' } as React.CSSProperties}>
              <Link to="/" onClick={(e) => handleNavClick(e, 'hero')}>
                <span className="mobile-link-icon">🏠</span> Home
              </Link>
            </li>
            <li style={{ '--delay': '0.1s' } as React.CSSProperties}>
              <Link to="/about" onClick={handleLinkClick}>
                <span className="mobile-link-icon">📖</span> About
              </Link>
            </li>
            <li style={{ '--delay': '0.15s' } as React.CSSProperties}>
              <Link to="/" onClick={(e) => handleNavClick(e, 'menu')}>
                <span className="mobile-link-icon">🍽️</span> Menu
              </Link>
            </li>
            <li style={{ '--delay': '0.2s' } as React.CSSProperties}>
              <Link to="/pickles" onClick={handleLinkClick}>
                <span className="mobile-link-icon">🥒</span> Pickles
              </Link>
            </li>
            <li style={{ '--delay': '0.25s' } as React.CSSProperties}>
              <Link to="/sweets" onClick={handleLinkClick}>
                <span className="mobile-link-icon">🍬</span> Sweets
              </Link>
            </li>
            <li style={{ '--delay': '0.3s' } as React.CSSProperties}>
              <Link to="/snacks" onClick={handleLinkClick}>
                <span className="mobile-link-icon">🍿</span> Snacks
              </Link>
            </li>
            <li style={{ '--delay': '0.35s' } as React.CSSProperties}>
              <Link to="/" onClick={(e) => handleNavClick(e, 'contact')}>
                <span className="mobile-link-icon">📞</span> Contact
              </Link>
            </li>
          </ul>
          <div className="mobile-menu-footer">
            {user ? (
              <div className="mobile-auth-section">
                <span className="mobile-user-name">Hi, {user.fullName}!</span>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="mobile-logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="mobile-login-btn" onClick={handleLinkClick}>
                Login / Register →
              </Link>
            )}
            <div className="mobile-menu-socials">
              <a href="https://wa.me/919441317724" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <img src="img/Whatsapp-icon.png" alt="WhatsApp" />
              </a>
              <a href="https://instagram.com/hirishicloudkitchen" target="_blank" rel="noopener noreferrer" title="Instagram">
                <img src="img/instagram-icon.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
