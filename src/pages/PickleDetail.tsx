import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pickles, vegPickles } from '../productsData';
import type { Product } from '../productsData';
import { useCart } from '../context/CartContext';

interface AlertState {
  show: boolean;
  message: string;
}

export const PickleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find the product and determine which list it belongs to
  let productList: Product[] = [];
  let product = pickles.find((p) => p.id === id);
  if (product) {
    productList = pickles;
  } else {
    product = vegPickles.find((p) => p.id === id);
    if (product) {
      productList = vegPickles;
    }
  }

  // Weight option index state
  const [weightIdx, setWeightIdx] = useState(0);
  const [alert, setAlert] = useState<AlertState>({ show: false, message: '' });

  // Reset weight selection when product changes
  useEffect(() => {
    setWeightIdx(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <section className="product-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center', color: '#fffbe6' }}>
          <h2 style={{ fontFamily: "var(--font-title)", fontSize: '2em' }}>Product Not Found</h2>
          <button onClick={() => navigate('/pickles')} className="hero-cta" style={{ border: 'none', cursor: 'pointer', marginTop: '20px' }}>
            Back to Pickles
          </button>
        </div>
      </section>
    );
  }

  // Calculate navigation neighbors
  const currentIndex = productList.findIndex((p) => p.id === product?.id);
  const prevProduct = productList[(currentIndex - 1 + productList.length) % productList.length];
  const nextProduct = productList[(currentIndex + 1) % productList.length];

  const handleAddToCart = () => {
    if (!product) return;
    const option = product.weights[weightIdx];
    addToCart(product.id, product.name, option.label, option.price);

    // Show alert
    setAlert({ show: true, message: `🎉 Added ${product.name} (${option.label}) to cart!` });
    setTimeout(() => {
      setAlert({ show: false, message: '' });
    }, 2500);
  };

  const selectedOption = product.weights[weightIdx];

  return (
    <section className="product-section" style={{ position: 'relative' }}>
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

      {/* Left Arrow Navigation */}
      <button
        onClick={() => navigate(`/pickles/${prevProduct.id}`)}
        className="nav-arrow left"
        style={{ background: 'none', border: 'none', outline: 'none' }}
      >
        <span className="tooltip">{prevProduct.name}</span>
      </button>

      {/* Right Arrow Navigation */}
      <button
        onClick={() => navigate(`/pickles/${nextProduct.id}`)}
        className="nav-arrow right"
        style={{ background: 'none', border: 'none', outline: 'none' }}
      >
        <span className="tooltip">{nextProduct.name}</span>
      </button>

      <div className="product-container">
        <div className="product-image-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={`img/${product.image}`}
            alt={product.name}
            className="product-image"
            style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>

        <div className="product-details">
          <h1 className="product-title" style={{ fontFamily: "var(--font-title)", fontWeight: 700 }}>
            {product.name}
          </h1>
          <p className="product-description" style={{ fontSize: '1.1em', opacity: 0.95 }}>
            {product.description}
          </p>

          <ul className="product-features" style={{ margin: '20px 0' }}>
            {product.features.map((feature, index) => (
              <li key={index} style={{ fontFamily: "var(--font-body)", fontSize: '1.1em' }}>
                {feature}
              </li>
            ))}
          </ul>

          <div className="weight-options" style={{ margin: '25px 0' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#e3d18a', fontFamily: "var(--font-title)", fontSize: '1.2em' }}>
              Select Weight:
            </label>
            <select
              className="weight-select"
              value={weightIdx}
              onChange={(e) => setWeightIdx(parseInt(e.target.value))}
              style={{ width: '100%', maxWidth: '250px' }}
            >
              {product.weights.map((w, idx) => (
                <option key={idx} value={idx}>
                  {w.label} - ₹{w.price}
                </option>
              ))}
            </select>
          </div>

          <div className="price-section" style={{ margin: '20px 0 30px 0' }}>
            <div className="selected-price" style={{ fontFamily: "var(--font-title)", fontSize: '1.8em', color: '#e3d18a', fontWeight: 'bold' }}>
              ₹{selectedOption.price}
            </div>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            style={{ border: 'none', cursor: 'pointer', padding: '12px 35px', borderRadius: '30px' }}
          >
            Add to Cart
          </button>
          
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => navigate(product?.isVeg ? '/pickles?type=veg' : '/pickles?type=non-veg')}
              className="login-btn"
              style={{ border: 'none', cursor: 'pointer', display: 'inline-block' }}
            >
              ← Back to Pickle List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
