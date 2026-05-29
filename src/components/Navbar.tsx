import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Home, BookOpen, ShoppingCart, Phone, Sun, Moon, ShoppingBag, Search, X, Minus, Plus } from 'lucide-react';
import { pickles, vegPickles, sweets, snacks } from '../productsData';

export const Navbar: React.FC = () => {
  const { cart, cartBadgeCount, cartGrandTotal, setIsCartOpen, updateQty } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('hck_theme');
    return (saved === 'dark' ? 'dark' : 'light');
  });
  const location = useLocation();

  // Mac Spotlight Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  // Close mini cart on page navigation
  useEffect(() => {
    setMiniCartOpen(false);
  }, [location.pathname]);

  // Close search on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset query on search open/close
  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  // Unified list of searchable items
  const searchableItems = [
    ...pickles.map(p => ({ ...p, type: 'pickle', categoryName: 'Non-Veg Pickle', path: `/pickles?searchProduct=${p.id}` })),
    ...vegPickles.map(p => ({ ...p, type: 'pickle', categoryName: 'Vegetarian Pickle', path: `/pickles?searchProduct=${p.id}` })),
    ...sweets.map(p => ({ ...p, type: 'sweet', categoryName: 'Sweets Cloud', path: `/sweets?searchProduct=${p.id}` })),
    ...snacks.map(p => ({ ...p, type: 'snack', categoryName: 'Snacks Cloud', path: `/snacks?searchProduct=${p.id}` }))
  ];

  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : searchableItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hck_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const isActive = (path: string) => location.pathname === path;

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.hash = '#/';
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* === TOP NAV: Logo + Theme + Cart === */}
      <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link 
          to="/" 
          className="top-nav-logo"
          onClick={() => {
            sessionStorage.removeItem('hck_welcome_seen');
            // If they are on the home page, trigger a reload to play the intro again
            if (window.location.hash === '#/' || window.location.pathname === '/' || window.location.hash === '') {
              window.location.reload();
            }
          }}
        >
          <img src="img/hirishi-logo.svg" alt="Hirishi" />
          <div className="top-nav-brand">
            <span className="brand-name">Hirishi</span>
            <span className="brand-sub">Cloud Kitchen</span>
          </div>
        </Link>

        {/* Floating Announcement Capsule (Desktop/Tablet Only) */}
        <div className="top-nav-promo" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer' }} title="Click to view cart and apply code!">
          <span className="promo-badge-glow"></span>
          <span className="coupon-code-mini">HIRISHI10</span>
          <span className="promo-text-mini">10% OFF above ₹2000! 🎉</span>
        </div>

        <div className="top-nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="top-nav-cart" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
            <ShoppingBag size={22} />
            {cartBadgeCount > 0 && (
              <span className="cart-badge cart-badge-pulse">{cartBadgeCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* === BOTTOM NAV: 5 tabs with center order button === */}
      <div className="bottom-nav">
        <Link 
          to="/" 
          className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="bottom-nav-icon"><Home size={20} /></span>
          Home
        </Link>
        <Link to="/about" className={`bottom-nav-item ${isActive('/about') ? 'active' : ''}`}>
          <span className="bottom-nav-icon"><BookOpen size={20} /></span>
          About
        </Link>
        <button 
          className="bottom-nav-order" 
          onClick={() => scrollToSection('menu')} 
          aria-label="Order Now"
        >
          <ShoppingCart size={24} />
        </button>
        <button
          className={`bottom-nav-item ${isSearchOpen ? 'active' : ''}`}
          onClick={() => setIsSearchOpen(true)}
        >
          <span className="bottom-nav-icon"><Search size={20} /></span>
          Search
        </button>
        <button
          className="bottom-nav-item"
          onClick={() => scrollToSection('contact')}
        >
          <span className="bottom-nav-icon"><Phone size={20} /></span>
          Contact
        </button>
      </div>

      {/* === MAC SPOTLIGHT SEARCH OVERLAY === */}
      <div className={`spotlight-backdrop ${isSearchOpen ? 'active' : ''}`} onClick={() => setIsSearchOpen(false)}>
        <div className={`spotlight-modal ${isSearchOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="spotlight-search-bar">
            <Search className="spotlight-icon-search" size={20} />
            <input
              type="text"
              className="spotlight-input"
              placeholder="Search pickles, sweets, snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen}
            />
            <button className="spotlight-close-btn" onClick={() => setIsSearchOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="spotlight-content">
            {searchQuery.trim() === '' ? (
              <>
                <div className="spotlight-section">
                  <div className="spotlight-section-title">Quick Categories</div>
                  <div className="spotlight-categories-grid">
                    <Link to="/pickles" className="spotlight-category-chip" onClick={() => setIsSearchOpen(false)}>
                      Pickles Cloud
                    </Link>
                    <Link to="/sweets" className="spotlight-category-chip" onClick={() => setIsSearchOpen(false)}>
                      Sweets Cloud
                    </Link>
                    <Link to="/snacks" className="spotlight-category-chip" onClick={() => setIsSearchOpen(false)}>
                      Snacks Cloud
                    </Link>
                  </div>
                </div>

                <div className="spotlight-section">
                  <div className="spotlight-section-title">Trending Searches</div>
                  <div className="spotlight-trending-list">
                    {[
                      { name: 'Chicken Boneless Pickle', path: '/pickles?searchProduct=chicken-boneless' },
                      { name: 'Mutton Keema Pickle', path: '/pickles?searchProduct=mutton-keema' },
                      { name: 'Mango Pickle', path: '/pickles?searchProduct=mango' },
                      { name: 'Kaju Katli (Coming Soon)', path: '/sweets' },
                      { name: 'Murukku (Coming Soon)', path: '/snacks' }
                    ].map((item, idx) => (
                      <Link 
                        key={idx} 
                        to={item.path} 
                        className="spotlight-trending-item" 
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <Search size={14} className="trending-icon" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="spotlight-section">
                <div className="spotlight-section-title">
                  Search Results ({filteredSearch.length})
                </div>
                {filteredSearch.length > 0 ? (
                  <div className="spotlight-results-list">
                    {filteredSearch.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="spotlight-result-item"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <img 
                          src={`img/${item.image}`} 
                          alt={item.name} 
                          className="spotlight-result-avatar"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'img/hirishi-logo.svg';
                          }}
                        />
                        <div className="spotlight-result-details">
                          <span className="spotlight-result-name">{item.name}</span>
                          <span className="spotlight-result-desc">
                            {item.categoryName} • {item.description ? item.description.substring(0, 70) + '...' : ''}
                          </span>
                        </div>
                        <div className="spotlight-result-action">
                          {item.type === 'pickle' ? (
                            <span className="price-tag">₹{(item as any).weights?.[0]?.price}</span>
                          ) : (
                            <span className="price-tag">{(item as any).price}</span>
                          )}
                          <Search size={14} />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="spotlight-empty-state">
                    No results found for "<strong>{searchQuery}</strong>". Try searching for "pickle", "sweets", or "chicken".
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="spotlight-footer">
            <span className="spotlight-hotkey">ESC</span> to close
          </div>
        </div>
      </div>

      {/* Global Mini Cart Bubble — expands from bottom nav */}
      {Object.keys(cart).length > 0 && (
        <>
          {!miniCartOpen ? (
            <button className="mini-cart-bubble" onClick={() => setMiniCartOpen(true)}>
              <ShoppingBag size={18} />
              <span className="mini-cart-bubble-count">{cartBadgeCount}</span>
              <span className="mini-cart-bubble-price">₹{cartGrandTotal}</span>
            </button>
          ) : (
            <div className="mini-cart-bar open">
              <div className="mini-cart-header">
                <span className="mini-cart-header-title"><ShoppingBag size={14} /> Your Items</span>
                <button className="mini-cart-close" onClick={() => setMiniCartOpen(false)}><X size={16} /></button>
              </div>
              <div className="mini-cart-items">
                {Object.values(cart).map((item) => (
                  <div className="mini-cart-item" key={item.cartId}>
                    <div className="mini-cart-item-info">
                      <span className="mini-cart-item-name">{item.name}</span>
                      <span className="mini-cart-item-weight">{item.weightLabel}</span>
                    </div>
                    <div className="mini-cart-item-qty">
                      <button onClick={() => updateQty(item.cartId, -1)} className="mini-cart-qty-btn"><Minus size={12} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.cartId, 1)} className="mini-cart-qty-btn"><Plus size={12} /></button>
                    </div>
                    <span className="mini-cart-item-price">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <button className="mini-cart-checkout" onClick={() => { setMiniCartOpen(false); setIsCartOpen(true); }}>
                <ShoppingBag size={16} />
                <span>View Cart ({cartBadgeCount})</span>
                <span className="mini-cart-total">₹{cartGrandTotal}</span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
