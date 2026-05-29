import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { snacks } from '../productsData';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Plus, Check, Sparkles, Flame, Award, X, ShoppingBag, Minus } from 'lucide-react';

interface EnhancedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: string;
  category: string;
  weights: { label: string; price: number }[];
  isVeg: boolean;
}

const enhancedSnacks: EnhancedProduct[] = snacks.map((s) => {
  // Dynamically parse base price from string like "₹250/kg"
  const numericPrice = parseInt(s.price.replace(/[^0-9]/g, '')) || 300;
  
  return {
    ...s,
    isVeg: true, // Snacks are vegetarian
    image: s.image && s.image.endsWith('.png') ? s.image : 'snacks-cloud.png',
    weights: [
      { label: '250g', price: Math.round((numericPrice / 4) + 10) },
      { label: '500g', price: Math.round((numericPrice / 2) + 5) },
      { label: '1kg', price: numericPrice }
    ]
  };
});

export const Snacks: React.FC = () => {
  const { addToCart, cart, cartGrandTotal, cartBadgeCount, setIsCartOpen, updateQty } = useCart();
  const location = useLocation();
  const cartItems = Object.values(cart);
  const [filter, setFilter] = useState<'all' | 'traditional' | 'spicy'>('all');
  const [selectedProduct, setSelectedProduct] = useState<EnhancedProduct | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<{ label: string; price: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Listen to search params for automatic product modal popup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchProduct = params.get('searchProduct');
    if (searchProduct) {
      const prod = enhancedSnacks.find((p) => p.id === searchProduct);
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

  const filtered = enhancedSnacks.filter((s) => {
    if (filter === 'traditional') return s.category === 'Traditional';
    if (filter === 'spicy') return s.category === 'Spicy' || s.category === 'Mixed';
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
          backgroundImage: "url('img/snacks-cloud.png')",
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
            <span className="section-label">Ammachethi Karappusa</span>
            <h1 className="section-title">Snacks Cloud</h1>
            <div className="section-divider"></div>
          </div>

          <div className="category-pills reveal">
            <button className={`category-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All Snacks
            </button>
            <button className={`category-pill ${filter === 'traditional' ? 'active' : ''}`} onClick={() => setFilter('traditional')}>
              <Award size={14} /> Traditional Classics
            </button>
            <button className={`category-pill ${filter === 'spicy' ? 'active' : ''}`} onClick={() => setFilter('spicy')}>
              <Flame size={14} /> Spicy & Savory Mix
            </button>
          </div>

          <div className="food-grid">
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className="food-card reveal"
                style={{ transitionDelay: `${index * 0.06}s` }}
                onClick={() => openSheet(product)}
              >
                <img src={`img/${product.image}`} alt={product.name} className="food-card-image" />
                <div className="food-card-gradient"></div>
                <div className="food-card-badge veg">
                  <Sparkles size={12} /> {product.badge || 'Snack'}
                </div>
                <div className="food-card-info">
                  <div className="food-card-name">{product.name}</div>
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

      {/* Mini Cart Bubble — expands from bottom nav */}
      {cartItems.length > 0 && (
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
                {cartItems.map((item) => (
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
              <button className="mini-cart-checkout" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={16} />
                <span>View Cart ({cartBadgeCount})</span>
                <span className="mini-cart-total">₹{cartGrandTotal}</span>
              </button>
            </div>
          )}
        </>
      )}

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
                <div className="food-card-badge veg" style={{ position: 'static', flexShrink: 0 }}>
                  <Sparkles size={12} /> SNACK
                </div>
              </div>

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
