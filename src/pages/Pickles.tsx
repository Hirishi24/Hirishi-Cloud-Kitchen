import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pickles, vegPickles } from '../productsData';
import type { Product, WeightOption } from '../productsData';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Plus, Check, Leaf, Drumstick, X } from 'lucide-react';

const allPickles = [...pickles, ...vegPickles];

export const Pickles: React.FC = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Listen to search params for automatic product modal popup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchProduct = params.get('searchProduct');
    if (searchProduct) {
      const prod = allPickles.find((p) => p.id === searchProduct);
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

  const filtered = allPickles.filter((p) => {
    if (filter === 'veg') return p.isVeg;
    if (filter === 'non-veg') return !p.isVeg;
    return true;
  });

  const openSheet = (product: Product) => {
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

  const quickAdd = (product: Product) => {
    openSheet(product);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <>
      <div className="page-enter" style={{ padding: '90px 0 40px' }}>
        <div className="section">
          <Link to="/" className="back-btn"><ArrowLeft size={16} /> Back to Home</Link>

          <div className="reveal">
            <span className="section-label">Our Signature Collection</span>
            <h1 className="section-title">Pickles Cloud</h1>
            <div className="section-divider"></div>
          </div>

          <div className="category-pills reveal">
            <button className={`category-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All Pickles
            </button>
            <button className={`category-pill ${filter === 'non-veg' ? 'active' : ''}`} onClick={() => setFilter('non-veg')}>
              <Drumstick size={14} /> Non-Veg
            </button>
            <button className={`category-pill ${filter === 'veg' ? 'active' : ''}`} onClick={() => setFilter('veg')}>
              <Leaf size={14} /> Vegetarian
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
                <img 
                  src={`img/${product.image}`} 
                  alt={product.name} 
                  className="food-card-image" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'img/Drumstick-pachadi-scaled.webp';
                  }}
                />
                <div className="food-card-gradient"></div>
                <div className={`food-card-badge ${product.isVeg ? 'veg' : 'non-veg'}`}>
                  {product.isVeg ? <><Leaf size={12} /> VEG</> : <><Drumstick size={12} /> NON-VEG</>}
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



      {/* Popup — OUTSIDE page-enter so position:fixed works correctly */}
      <div className={`sheet-backdrop ${selectedProduct ? 'show' : ''}`} onClick={closeSheet}></div>
      <div className={`bottom-sheet ${selectedProduct ? 'show' : ''}`}>
        {selectedProduct && (
          <>
            <button className="sheet-close-btn" onClick={closeSheet} aria-label="Close"><X size={18} /></button>
            <img 
              src={`img/${selectedProduct.image}`} 
              alt={selectedProduct.name} 
              className="sheet-product-image" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'img/Drumstick-pachadi-scaled.webp';
              }}
            />
            <div className="sheet-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <h2 className="sheet-product-name" style={{ marginBottom: 0, flex: 1 }}>{selectedProduct.name}</h2>
                <div className={`food-card-badge ${selectedProduct.isVeg ? 'veg' : 'non-veg'}`} style={{ position: 'static', flexShrink: 0 }}>
                  {selectedProduct.isVeg ? <><Leaf size={12} /> VEG</> : <><Drumstick size={12} /> NON-VEG</>}
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
