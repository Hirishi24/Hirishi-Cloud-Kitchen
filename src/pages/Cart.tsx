import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { allProducts } from '../productsData';

export const Cart: React.FC = () => {
  const {
    cart,
    cartTotalBeforeDiscount,
    cartDiscount,
    cartGrandTotal,
    couponApplied,
    couponCode,
    couponExpireTime,
    updateQty,
    removeItem,
    clearCart,
    applyCoupon,
  } = useCart();

  // Modal States
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  // Checkout Wizard States
  const [checkoutStep, setCheckoutStep] = useState<'option' | 'details' | 'success' | null>(null);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    isInternational: false,
    country: 'India'
  });

  // Coupon Form state
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [pandaState, setPandaState] = useState<'idle' | 'run' | 'jump'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);

  // Timer formatted state
  const [timerText, setTimerText] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!couponApplied || !couponExpireTime) {
      setTimerText('');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const left = Math.max(0, Math.floor((couponExpireTime - now) / 1000));
      const min = Math.floor(left / 60);
      const sec = left % 60;
      setTimerText(`${min}:${sec.toString().padStart(2, '0')}`);

      if (left <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [couponApplied, couponExpireTime]);

  // Handle coupon apply action
  const handleApplyCoupon = () => {
    const res = applyCoupon(couponInput);
    setCouponMessage(res.message);

    if (res.success) {
      setPandaState('jump');
      setShowConfetti(true);
      setTimeout(() => {
        setShowCouponModal(false);
        setShowConfetti(false);
        setPandaState('idle');
      }, 1800);
    } else {
      setPandaState('idle');
    }
  };

  const handleOpenCouponModal = () => {
    setShowCouponModal(true);
    setCouponMessage('');
    setCouponInput('');
    setPandaState('run');
    setTimeout(() => {
      setPandaState('idle');
    }, 900);
  };

  const handleOpenClearCartModal = () => {
    const hasItems = Object.keys(cart).length > 0;
    setShowClearCartModal(true);
    if (hasItems) {
      setTimeout(() => {
        clearCart();
        setShowClearCartModal(false);
      }, 1800);
    } else {
      setTimeout(() => {
        setShowClearCartModal(false);
      }, 1800);
    }
  };

  // Generate WhatsApp message with order details
  const getWhatsAppLink = () => {
    const phone = '919573969154';
    let message = 'Hello Hirishi Cloud Kitchen! I would like to place an order:\n\n';
    
    Object.values(cart).forEach((item) => {
      message += `• ${item.qty} x ${item.name} - ₹${item.price * item.qty}\n`;
    });

    message += `\nSubtotal: ₹${cartTotalBeforeDiscount}`;
    if (couponApplied && cartDiscount > 0) {
      message += `\nCoupon Applied: ${couponCode} (-₹${cartDiscount})`;
    }
    message += `\nGrand Total: ₹${cartGrandTotal}\n\nPlease let me know the payment and delivery details. Thanks!`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const cartItems = Object.values(cart);

  return (
    <section className="menu-section" style={{ minHeight: '100vh' }}>
      <h2 className="menu-title">Your Cart</h2>

      {/* Cart List */}
      <div id="cart-list" className="menu-grid" style={{ flexDirection: 'column', alignItems: 'center', display: 'flex', gap: '20px' }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            // Find product image
            const product = allProducts.find((p) => p.id === item.productId);
            const imgSrc = product ? `img/${product.image}` : 'img/pickles.svg';

            return (
              <div
                key={item.cartId}
                className="menu-item"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1em',
                  padding: '1.2em',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '90px' }}>
                  <img
                    src={imgSrc}
                    alt={item.name}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #e3d18a', backgroundColor: '#fffbe6', objectFit: 'cover' }}
                  />
                  <svg width="38" height="38" viewBox="0 0 90 90" style={{ marginTop: '-8px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="45" cy="55" rx="16" ry="14" fill="#fff" stroke="#1b3c3d" stroke-width="2" />
                    <ellipse cx="30" cy="44" rx="5" ry="6" fill="#1b3c3d" />
                    <ellipse cx="60" cy="44" rx="5" ry="6" fill="#1b3c3d" />
                    <ellipse cx="40" cy="58" rx="2.2" ry="2.5" fill="#1b3c3d" />
                    <ellipse cx="50" cy="58" rx="2.2" ry="2.5" fill="#1b3c3d" />
                    <ellipse cx="40" cy="59" rx="0.7" ry="1" fill="#fff" />
                    <ellipse cx="50" cy="59" rx="0.7" ry="1" fill="#fff" />
                    <ellipse cx="45" cy="65" rx="1.2" ry="0.7" fill="#1b3c3d" />
                    <path d="M42 68 Q45 70 48 68" stroke="#1b3c3d" stroke-width="1.2" fill="none" />
                  </svg>
                  <div style={{ fontFamily: "var(--font-title)", fontSize: '0.85em', color: '#1b3c3d', backgroundColor: '#e3d18a', borderRadius: '8px', padding: '0.1em 0.5em', marginTop: '2px', whiteSpace: 'nowrap' }}>
                    Take it home!
                  </div>
                </div>

                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontFamily: "var(--font-title)", fontWeight: 700, fontSize: '1.2em', color: 'var(--color-gold-hover)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: '1.15em', color: 'var(--color-text-light)' }}>
                    ₹{item.price} x {item.qty} = <b>₹{item.price * item.qty}</b>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3em' }}>
                  <button
                    onClick={() => updateQty(item.cartId, 1)}
                    style={{ width: '28px', height: '28px', fontFamily: "var(--font-title)", borderRadius: '50%', border: 'none', background: 'var(--color-gold)', color: 'var(--color-bg-dark)', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    +
                  </button>
                  <span style={{ fontFamily: "var(--font-title)", fontSize: '1.2em', fontWeight: 'bold', color: 'var(--color-text-light)' }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.cartId, -1)}
                    style={{ width: '28px', height: '28px', fontFamily: "var(--font-title)", borderRadius: '50%', border: 'none', background: 'var(--color-gold)', color: 'var(--color-bg-dark)', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeItem(item.cartId)}
                    style={{ marginTop: '0.5em', color: '#ff6b6b', background: 'none', border: 'none', fontFamily: "var(--font-title)", cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ color: '#fffbe6', fontSize: '1.5em', margin: '2em 0', fontFamily: "var(--font-title)" }}>
            Your cart is empty.
          </div>
        )}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px' }}>
          <div id="cart-total" style={{ textAlign: 'center', fontSize: '1.5em', margin: '1.5em 0', color: '#e3d18a', fontFamily: "var(--font-title)" }}>
            {couponApplied && cartDiscount > 0 ? (
              <div className="total-anim-wrap">
                <span className="old-total-anim">₹{cartTotalBeforeDiscount}</span>
                <span className="new-total-anim show-new-total">₹{cartGrandTotal}</span>
                <span className="savings-anim show-savings">(You saved ₹{cartDiscount}!)</span>
                {timerText && (
                  <div id="coupon-timer-box" className="coupon-timer-box">
                    <div className="timer-anim">
                      <b>Coupon active!</b> Use within <span className="timer-count">{timerText}</span> minutes to checkout.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span>Grand Total: <b>₹{cartTotalBeforeDiscount}</b></span>
            )}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1em' }}>
            <button className="clear-cart-btn" onClick={handleOpenClearCartModal}>
              Clear Cart
            </button>
          </div>

          <div className="coupon-area" style={{ textAlign: 'center' }}>
            <button className="coupon-reveal-btn" onClick={handleOpenCouponModal}>
              Have a coupon code?
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.5em', marginTop: '1.5em' }}>
            <button className="buy-now-btn" onClick={() => { setShowBuyModal(true); setCheckoutStep('option'); }}>
              Buy Now
            </button>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '2em', marginTop: '1.5em' }}>
        <Link to="/pickles" className="hero-cta">
          Continue Shopping
        </Link>
      </div>

      {/* Buy Now / Checkout Wizard Modal */}
      {showBuyModal && (
        <>
          <div className="buy-modal show" onClick={() => setShowBuyModal(false)}></div>
          <div className="buy-modal show" style={{ zIndex: 2001, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="cloud-shape" style={{ maxWidth: '480px', width: '90%', padding: '2.5em 2em' }} onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowBuyModal(false)}>
                &times;
              </button>

              {checkoutStep === 'option' && (
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontFamily: "var(--font-title)", color: 'var(--color-gold)', fontSize: '1.6em', marginBottom: '0.8em' }}>
                    Choose Checkout Method
                  </h3>
                  
                  {/* WhatsApp Special Promo Card */}
                  <div style={{
                    background: 'rgba(27, 60, 61, 0.4)',
                    border: '1.5px solid var(--color-gold)',
                    borderRadius: '16px',
                    padding: '1.2em',
                    marginBottom: '1.5em',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                  }}>
                    <span style={{ fontSize: '2em', display: 'block', marginBottom: '0.2em' }}>🎁</span>
                    <p style={{ margin: 0, fontFamily: "var(--font-title)", fontSize: '1.15em', color: '#fffbe6', lineHeight: '1.4' }}>
                      Get a <b>Flat 10% Discount</b> + extra custom surprises when ordering directly on WhatsApp!
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {/* WhatsApp Checkout Button */}
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-cta"
                      onClick={() => {
                        setShowBuyModal(false);
                        clearCart();
                      }}
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '12px 20px',
                        borderRadius: '30px',
                        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                        transition: 'transform 0.2s'
                      }}
                    >
                      💬 Order via WhatsApp (Best Discount)
                    </a>

                    {/* Standard Checkout Button */}
                    <button
                      className="hero-cta"
                      onClick={() => setCheckoutStep('details')}
                      style={{
                        width: '100%',
                        border: '1.5px solid var(--color-gold)',
                        background: 'transparent',
                        color: 'var(--color-gold)',
                        padding: '12px 20px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      🛒 Continue standard checkout here
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'details' && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-title)", color: 'var(--color-gold)', fontSize: '1.5em', marginBottom: '1em', textAlign: 'center' }}>
                    Shipping Details
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCheckoutStep('success');
                      clearCart();
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="checkout-name" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Full Name</label>
                      <input
                        type="text"
                        id="checkout-name"
                        required
                        placeholder="Enter recipient's name"
                        value={shippingDetails.fullName}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 251, 230, 0.05)', color: '#fffbe6' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="checkout-phone" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Phone Number</label>
                      <input
                        type="tel"
                        id="checkout-phone"
                        required
                        placeholder="Enter mobile number"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.05)', color: '#fffbe6' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="checkout-address" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Shipping Address</label>
                      <textarea
                        id="checkout-address"
                        required
                        placeholder="House No, Street, Landmark, City, State, PIN"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.05)', color: '#fffbe6', minHeight: '60px' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="checkout-destination" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Shipping Destination</label>
                      <select
                        id="checkout-destination"
                        value={shippingDetails.isInternational ? 'intl' : 'domestic'}
                        onChange={(e) => {
                          const isIntl = e.target.value === 'intl';
                          setShippingDetails({
                            ...shippingDetails,
                            isInternational: isIntl,
                            country: isIntl ? '' : 'India'
                          });
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: '#1b3c3d', color: '#fffbe6' }}
                      >
                        <option value="domestic">🇮🇳 India Delivery</option>
                        <option value="intl">🌎 International Delivery (Worldwide)</option>
                      </select>
                    </div>

                    {shippingDetails.isInternational && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label htmlFor="checkout-country" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Destination Country</label>
                        <input
                          type="text"
                          id="checkout-country"
                          required
                          placeholder="e.g. USA, Canada, UAE, UK"
                          value={shippingDetails.country}
                          onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.05)', color: '#fffbe6' }}
                        />
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('option')}
                        style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid var(--glass-border)', background: 'transparent', color: '#fffbe6', cursor: 'pointer' }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="hero-cta"
                        style={{ flex: 2, padding: '10px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}
                      >
                        Confirm & Place Order
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div style={{ textAlign: 'center' }}>
                  <div className="success-lottie-container" style={{ margin: '0 auto 15px auto', width: '80px', height: '80px' }}>
                    <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                      <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                  
                  <h3 style={{ fontFamily: "var(--font-title)", color: 'var(--color-gold)', fontSize: '1.6em', marginBottom: '0.5em' }}>
                    Order Placed!
                  </h3>
                  <p style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '1.1em', lineHeight: '1.5', marginBottom: '1.2em' }}>
                    Amma Chethi Vantillu is preparing your delicious pickles with love! We will reach out to you shortly on your provided contact details to coordinate custom updates.
                  </p>
                  
                  <button
                    className="hero-cta"
                    onClick={() => setShowBuyModal(false)}
                    style={{ border: 'none', cursor: 'pointer', padding: '10px 30px' }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <>
          <div className="buy-modal show" onClick={() => setShowCouponModal(false)}></div>
          <div className="buy-modal show" style={{ zIndex: 2001, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="cloud-shape" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowCouponModal(false)}>
                &times;
              </button>
              <div className="panda-coupon-area">
                <div id="panda-runner" className={`panda-runner ${pandaState === 'run' ? 'panda-run' : ''} ${pandaState === 'jump' ? 'panda-jump' : ''}`}>
                  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="45" cy="55" rx="22" ry="20" fill="#fff" stroke="#1b3c3d" stroke-width="2" />
                    <ellipse cx="25" cy="40" rx="7" ry="8" fill="#1b3c3d" />
                    <ellipse cx="65" cy="40" rx="7" ry="8" fill="#1b3c3d" />
                    <ellipse cx="37" cy="58" rx="4" ry="5" fill="#1b3c3d" />
                    <ellipse cx="53" cy="58" rx="4" ry="5" fill="#1b3c3d" />
                    <ellipse cx="37" cy="60" rx="1.2" ry="1.5" fill="#fff" />
                    <ellipse cx="53" cy="60" rx="1.2" ry="1.5" fill="#fff" />
                    <ellipse cx="45" cy="65" rx="2.2" ry="1.2" fill="#1b3c3d" />
                    <path d="M42 68 Q45 70 48 68" stroke="#1b3c3d" stroke-width="1.5" fill="none" />
                    <rect x="30" y="75" width="30" height="14" rx="4" fill="#e3d18a" stroke="#1b3c3d" stroke-width="2" />
                  </svg>
                </div>
                <div id="coupon-box-area" className="coupon-box-area">
                  <input
                    type="text"
                    id="coupon-modal-input"
                    className="coupon-input"
                    placeholder="Type your coupon code..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button className="apply-coupon-btn" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>
              </div>
              <div className="cloud-message" id="coupon-modal-message" style={{ minHeight: '30px' }}>
                {couponMessage}
              </div>
              {showConfetti && (
                <div id="confetti" className="confetti" style={{ pointerEvents: 'none' }}>
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="confetti-piece"
                      style={{
                        left: `${Math.random() * 90 + 5}%`,
                        background: ['#e3d18a', '#fffbe6', '#1b3c3d', '#f7c873'][i % 4],
                        animationDelay: `${Math.random() * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Clear Cart Modal */}
      {showClearCartModal && (
        <>
          <div className="buy-modal show" onClick={() => setShowClearCartModal(false)}></div>
          <div className="buy-modal show" style={{ zIndex: 2001, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="cloud-shape" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowClearCartModal(false)}>
                &times;
              </button>
              <div className="panda-clear-area">
                {cartItems.length > 0 ? (
                  <>
                    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="panda-wave">
                      <ellipse cx="45" cy="55" rx="22" ry="20" fill="#fff" stroke="#1b3c3d" stroke-width="2" />
                      <ellipse cx="25" cy="40" rx="7" ry="8" fill="#1b3c3d" />
                      <ellipse cx="65" cy="40" rx="7" ry="8" fill="#1b3c3d" />
                      <ellipse cx="37" cy="58" rx="4" ry="5" fill="#1b3c3d" />
                      <ellipse cx="53" cy="58" rx="4" ry="5" fill="#1b3c3d" />
                      <ellipse cx="37" cy="60" rx="1.2" ry="1.5" fill="#fff" />
                      <ellipse cx="53" cy="60" rx="1.2" ry="1.5" fill="#fff" />
                      <ellipse cx="45" cy="65" rx="2.2" ry="1.2" fill="#1b3c3d" />
                      <path d="M42 68 Q45 70 48 68" stroke="#1b3c3d" stroke-width="1.5" fill="none" />
                      <ellipse className="panda-hand wave-hand" cx="65" cy="70" rx="5" ry="2.5" fill="#1b3c3d" />
                    </svg>
                    <div className="cloud-message">Cart cleared! Panda says bye! 👋</div>
                  </>
                ) : (
                  <>
                    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="panda-relax">
                      <ellipse cx="45" cy="55" rx="22" ry="20" fill="#fff" stroke="#1b3c3d" stroke-width="2" />
                      <ellipse cx="25" cy="40" rx="7" ry="8" fill="#1b3c3d" />
                      <ellipse cx="65" cy="40" rx="7" ry="8" fill="#1b3c3d" />
                      <ellipse cx="37" cy="58" rx="4" ry="5" fill="#1b3c3d" />
                      <ellipse cx="53" cy="58" rx="4" ry="5" fill="#1b3c3d" />
                      <ellipse cx="37" cy="60" rx="1.2" ry="1.5" fill="#fff" />
                      <ellipse cx="53" cy="60" rx="1.2" ry="1.5" fill="#fff" />
                      <ellipse cx="45" cy="65" rx="2.2" ry="1.2" fill="#1b3c3d" />
                      <path d="M40 70 Q45 75 50 70" stroke="#1b3c3d" stroke-width="1.5" fill="none" />
                      <ellipse cx="65" cy="75" rx="5" ry="2.5" fill="#1b3c3d" />
                    </svg>
                    <div className="cloud-message">Hey bro, your cart is already clear! 💤</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
