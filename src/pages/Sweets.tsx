import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sweets } from '../productsData';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Plus, Check, Sparkles, Star, Award, X } from 'lucide-react';

interface EnhancedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: string;
  weights: { label: string; price: number }[];
  isVeg: boolean;
}

const enhancedSweets: EnhancedProduct[] = sweets.map((s) => {
  // Dynamically parse base price from string like "₹350/kg"
  const numericPrice = parseInt(s.price.replace(/[^0-9]/g, '')) || 400;
  
  return {
    ...s,
    isVeg: true, // Sweets are vegetarian
    image: s.image && s.image.endsWith('.png') ? s.image : 'sweets-cloud.png',
    weights: [
      { label: '250g', price: Math.round((numericPrice / 4) + 10) },
      { label: '500g', price: Math.round((numericPrice / 2) + 5) },
      { label: '1kg', price: numericPrice }
    ]
  };
});

export const Sweets: React.FC = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const [filter, setFilter] = useState<'all' | 'bestseller' | 'traditional'>('all');
  const [selectedProduct, setSelectedProduct] = useState<EnhancedProduct | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<{ label: string; price: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Listen to search params for automatic product modal popup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchProduct = params.get('searchProduct');
    if (searchProduct) {
      const prod = enhancedSweets.find((p) => p.id === searchProduct);
      if (prod) {
        setSelectedProduct(prod);
        setSelectedWeight(prod.weights[0]);
        document.body.style.overflow = 'hidden';
      }
    } else {
      closeSheet();
    }
  }, [location.search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  const filtered = enhancedSweets.filter((s) => {
    if (filter === 'bestseller') return s.badge === 'Best Seller' || s.badge === 'Premium';
    if (filter === 'traditional') return s.badge === 'Traditional' || s.badge === 'Popular';
    return true;
  });

  const openSheet = (product: EnhancedProduct) => {
    setSelectedProduct(product);
    setSelectedWeight(product.weights[0]);
    document.body.style.overflow = 'hidden';
  };

  const closeSheet = () => {
    setSelectedProduct(null);
    setSelectedWeight(null);
    document.body.style.overflow = '';
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedWeight) return;
    addToCart(selectedProduct.id, selectedProduct.name, selectedWeight.label, selectedWeight.price);
    showToast(`${selectedProduct.name} (${selectedWeight.label}) added to cart!`);
    closeSheet();
  };

  const quickAdd = (product: EnhancedProduct) => {
    openSheet(product);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <>
      {/* Blurred background luxury overlay for full visual consistency */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: "url('img/sweets-cloud.png')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: 0.05,
          filter: 'blur(10px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="page-enter" style={{ padding: '90px 0 40px' }}>
        <div className="section">
          <Link to="/" className="back-btn"><ArrowLeft size={16} /> Back to Home</Link>

          <div className="reveal">
            <span className="section-label">Ammachethi Madhuram</span>
            <h1 className="section-title">Sweets Cloud</h1>
            <div className="section-divider"></div>
          </div>

          <div className="category-pills reveal">
            <button className={`category-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All Sweets
            </button>
            <button className={`category-pill ${filter === 'bestseller' ? 'active' : ''}`} onClick={() => setFilter('bestseller')}>
              <Star size={14} /> Best Sellers & Premium
            </button>
            <button className={`category-pill ${filter === 'traditional' ? 'active' : ''}`} onClick={() => setFilter('traditional')}>
              <Award size={14} /> Traditional Favorites
            </button>
          </div>

          <div className="food-grid">
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className={`food-card reveal ${product.id === 'pootharekulu' ? 'highlighted-premium-card' : ''}`}
                style={{ 
                  transitionDelay: `${index * 0.06}s`,
                  ...(product.id === 'pootharekulu' ? {
                    border: '1.5px solid var(--gold)',
                    boxShadow: '0 10px 30px rgba(227, 209, 138, 0.22), 0 0 15px rgba(227, 209, 138, 0.08)',
                    background: 'linear-gradient(180deg, rgba(227, 209, 138, 0.05) 0%, var(--glass-bg) 100%)'
                  } : {})
                }}
                onClick={() => openSheet(product)}
              >
                <img src={`img/${product.image}`} alt={product.name} className="food-card-image" />
                <div className="food-card-gradient"></div>
                <div 
                  className={`food-card-badge ${product.id === 'pootharekulu' ? 'gold-premium-badge' : 'veg'}`}
                  style={product.id === 'pootharekulu' ? { background: 'var(--gold)', color: 'var(--bg-primary)', fontWeight: 'bold' } : {}}
                >
                  <Sparkles size={12} /> {product.badge || 'Sweet'}
                </div>
                <div className="food-card-info">
                  <div className="food-card-name" style={product.id === 'pootharekulu' ? { color: 'var(--gold)', fontWeight: '700' } : {}}>{product.name}</div>
                  <div className="food-card-desc">{product.description}</div>
                  <div className="food-card-bottom">
                    <div className="food-card-price">
                      <span className="from">From</span>
                      ₹{product.weights[0].price}
                    </div>
                    <button
                      className="food-card-add"
                      onClick={(e) => { e.stopPropagation(); quickAdd(product); }}
                      aria-label={`Add ${product.name} to cart`}
                      style={product.id === 'pootharekulu' ? { background: 'var(--gold)', color: 'var(--bg-primary)' } : {}}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup — OUTSIDE page-enter so position:fixed works correctly */}
      <div className={`sheet-backdrop ${selectedProduct ? 'show' : ''}`} onClick={closeSheet}></div>
      <div className={`bottom-sheet ${selectedProduct ? 'show' : ''}`}>
        {selectedProduct && (
          <>
            <button className="sheet-close-btn" onClick={closeSheet} aria-label="Close"><X size={18} /></button>
            <img src={`img/${selectedProduct.image}`} alt={selectedProduct.name} className="sheet-product-image" />
            <div className="sheet-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <h2 className="sheet-product-name" style={{ marginBottom: 0, flex: 1 }}>{selectedProduct.name}</h2>
                <div 
                  className={`food-card-badge ${selectedProduct.id === 'pootharekulu' ? 'gold-premium-badge' : 'veg'}`}
                  style={selectedProduct.id === 'pootharekulu' ? { background: 'var(--gold)', color: 'var(--bg-primary)', fontWeight: 'bold', position: 'static', flexShrink: 0 } : { position: 'static', flexShrink: 0 }}
                >
                  <Sparkles size={12} /> {selectedProduct.id === 'pootharekulu' ? 'SIGNATURE' : 'SWEET'}
                </div>
              </div>

              {selectedProduct.id === 'pootharekulu' && (
                <div style={{
                  background: 'rgba(227, 209, 138, 0.07)',
                  border: '1px dashed var(--gold)',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  fontSize: '0.85em',
                  color: 'var(--gold)',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  textAlign: 'left',
                  boxShadow: 'inset 0 0 10px rgba(227, 209, 138, 0.05)'
                }}>
                  👑 <strong>Royal Andhra Nethi Pootharekulu</strong><br />
                  Handmade using pure high-grade cow ghee (Nethi), premium paper-thin rice wrappers, and loaded with crushed dry fruits.
                  <div style={{ marginTop: '8px', fontSize: '0.92em', color: 'var(--text-secondary)', borderTop: '1px solid rgba(227, 209, 138, 0.15)', paddingTop: '6px' }}>
                    ✨ <strong>Available Types:</strong><br />
                    • Dry Fruit Jaggery Ghee Pootharekulu (Standard)<br />
                    • Dry Fruit Sugar Ghee Pootharekulu<br />
                    • Special Premium Kova Pootharekulu
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '0.85em', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    *Specify your preferred types in the WhatsApp chat checkout!
                  </div>
                </div>
              )}

              <div className="weight-options">
                {selectedProduct.weights.map((w) => (
                  <button
                    key={w.label}
                    className={`weight-chip ${selectedWeight?.label === w.label ? 'selected' : ''}`}
                    onClick={() => setSelectedWeight(w)}
                  >
                    <span>{w.label}</span>
                    <span className="weight-chip-price">₹{w.price}</span>
                  </button>
                ))}
              </div>

              <button className="sheet-add-btn" onClick={handleAddToCart}>
                Add to Cart — ₹{selectedWeight?.price || 0}
              </button>
            </div>
          </>
        )}
      </div>

      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </>
  );
};
