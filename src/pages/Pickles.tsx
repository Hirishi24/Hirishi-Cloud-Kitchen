import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { pickles, vegPickles } from '../productsData';
import type { Product } from '../productsData';
import { useCart } from '../context/CartContext';

interface AlertState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export const Pickles: React.FC = () => {
  const { cart, addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // View state: 'select' | 'non-veg' | 'veg'
  const currentView = (searchParams.get('type') as 'non-veg' | 'veg' | 'select') || 'select';

  // Dynamic weight and price selections per product card
  // Key: product.id, Value: weight index (0, 1, 2)
  const [selectedWeights, setSelectedWeights] = useState<{ [key: string]: number }>({});
  
  // Alert Toast state
  const [alert, setAlert] = useState<AlertState>({ show: false, message: '', type: 'success' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const setView = (type: 'select' | 'non-veg' | 'veg') => {
    if (type === 'select') {
      setSearchParams({});
    } else {
      setSearchParams({ type });
    }
  };

  const handleWeightChange = (productId: string, index: number) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  const handleAddToCart = (product: Product) => {
    const weightIndex = selectedWeights[product.id] || 0;
    const option = product.weights[weightIndex];
    addToCart(product.id, product.name, option.label, option.price);

    // Show Toast
    setAlert({
      show: true,
      message: `🎉 Added ${product.name} (${option.label}) to cart!`,
      type: 'success',
    });

    // Hide Toast after 2.5s
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  // Get total quantity of a product in the cart (across all weights)
  const getProductCartCount = (productId: string) => {
    let count = 0;
    Object.keys(cart).forEach((key) => {
      if (key.startsWith(`${productId}-`)) {
        count += cart[key].qty;
      }
    });
    return count;
  };

  const renderProductList = (items: Product[], title: string) => {
    return (
      <section className="menu-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 20px auto', padding: '0 20px' }}>
          <button onClick={() => setView('select')} className="login-btn" style={{ border: 'none', cursor: 'pointer' }}>
            ← Back to Clouds
          </button>
          <h2 className="menu-title" style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={() => setView(currentView === 'non-veg' ? 'veg' : 'non-veg')}
            className="login-btn"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            Go to {currentView === 'non-veg' ? 'Veg' : 'Non-Veg'} Cloud
          </button>
        </div>

        <div className="menu-grid">
          {items.map((p) => {
            const weightIdx = selectedWeights[p.id] || 0;
            const minPrice = Math.min(...p.weights.map((w) => w.price));
            const selectedOption = p.weights[weightIdx];
            const inCartQty = getProductCartCount(p.id);

            return (
              <div key={p.id} className="menu-item" style={{ position: 'relative' }}>
                <Link to={`/pickles/${p.id}`} className="menu-item-link" style={{ display: 'block', width: '100%' }}>
                  <img
                    src={`/img/${p.image}`}
                    alt={p.name}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 10px auto' }}
                  />
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'block', textAlign: 'center' }}>
                    {p.name}
                  </span>
                </Link>
                <div className="price-row" style={{ margin: '5px 0' }}>
                  <span className="selling" style={{ fontSize: '0.9em', opacity: 0.8 }}>
                    from ₹{minPrice} onwards
                  </span>
                </div>
                <div style={{ margin: '0.7em 0', width: '100%' }}>
                  <select
                    className="weight-select"
                    value={weightIdx}
                    onChange={(e) => handleWeightChange(p.id, parseInt(e.target.value))}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  >
                    {p.weights.map((w, idx) => (
                      <option key={idx} value={idx}>
                        {w.label} - ₹{w.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="selected-price" style={{ fontWeight: 'bold', fontSize: '1.2em', margin: '5px 0' }}>
                  ₹{selectedOption.price}
                </div>
                {inCartQty > 0 && (
                  <div className="item-quantity" style={{ display: 'block', marginBottom: '8px' }}>
                    {inCartQty} {inCartQty === 1 ? 'item' : 'items'} in cart
                  </div>
                )}
                <button
                  className="hero-cta"
                  onClick={() => handleAddToCart(p)}
                  style={{ border: 'none', cursor: 'pointer', width: '100%', padding: '8px 0', marginTop: '5px' }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast Alert */}
      {alert.show && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#1b3c3d',
            color: '#fffbe6',
            border: '2px solid #e3d18a',
            borderRadius: '12px',
            padding: '15px 25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            zIndex: 9999,
            fontFamily: "var(--font-title)",
            fontSize: '1.2em',
            animation: 'slideDown 0.3s ease-out',
          }}
        >
          {alert.message}
        </div>
      )}

      {currentView === 'select' && (
        <section className="pickle-cloud-section">
          <h1 className="pickle-cloud-title">Select Your Pickle Cloud</h1>
          <div className="pickle-cloud-container">
            <div className="pickle-cloud-box non-veg-box" onClick={() => setView('non-veg')}>
              <div className="floating-icon icon-1">🍗</div>
              <div className="floating-icon icon-2">🌶️</div>
              <div className="floating-icon icon-3">🧂</div>
              <div className="box-content">
                <h2 className="box-title">Non-Veg Pickle Cloud</h2>
                <p className="box-description">
                  Explore our premium collection of non-vegetarian pickles, crafted with the finest meats and traditional spices. From chicken to mutton, each pickle is a burst of authentic flavors.
                </p>
                <button className="box-button" style={{ border: 'none', cursor: 'pointer' }}>
                  Explore Non-Veg Pickles
                </button>
              </div>
            </div>

            <div className="pickle-cloud-box veg-box" onClick={() => setView('veg')}>
              <div className="floating-icon icon-1">🥬</div>
              <div className="floating-icon icon-2">🌿</div>
              <div className="floating-icon icon-3">🧅</div>
              <div className="box-content">
                <h2 className="box-title">Veg Pickle Cloud</h2>
                <p className="box-description">
                  Discover our delightful range of vegetarian pickles, made with fresh vegetables and aromatic spices. Perfect for adding a tangy twist to your meals.
                </p>
                <button className="box-button" style={{ border: 'none', cursor: 'pointer' }}>
                  Explore Veg Pickles
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentView === 'non-veg' && renderProductList(pickles, 'Non-Veg Pickles Cloud')}
      {currentView === 'veg' && renderProductList(vegPickles, 'Veg Pickles Cloud')}
    </div>
  );
};
