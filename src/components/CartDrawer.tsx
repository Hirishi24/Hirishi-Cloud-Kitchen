import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { allProducts } from '../productsData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartTotalBeforeDiscount,
    cartDiscount,
    cartGrandTotal,
    couponApplied,
    couponCode,
    updateQty,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    applyCoupon,
  } = useCart();

  // Local states for checkout wizard inside the drawer
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'option' | 'details' | 'success'>('option');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    isInternational: false,
    country: 'India'
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMessage(res.message);
  };

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

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="cart-drawer-backdrop show"
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 3000,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Slide-over Drawer Panel */}
      <div
        className="cart-drawer show"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '450px',
          height: '100%',
          backgroundColor: 'rgba(20, 38, 38, 0.95)',
          borderLeft: '1px solid var(--glass-border)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
          zIndex: 3001,
          display: 'flex',
          flexDirection: 'column',
          color: '#fffbe6',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontFamily: 'var(--font-title)', color: 'var(--color-gold)', fontSize: '1.8em' }}>
            Shopping Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff6b6b',
              fontSize: '1.2em',
              cursor: 'pointer',
              fontFamily: 'var(--font-title)',
            }}
          >
            Minimize ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {cartItems.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cartItems.map((item) => {
                const product = allProducts.find((p) => p.id === item.productId);
                const imgSrc = product ? `img/${product.image}` : 'img/pickles.svg';

                return (
                  <div
                    key={item.cartId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '12px',
                      background: 'rgba(255, 251, 230, 0.05)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={item.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid var(--color-gold)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontFamily: 'var(--font-title)', color: 'var(--color-gold)', fontSize: '1.1em' }}>
                        {item.name}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.95em', opacity: 0.9 }}>
                        ₹{item.price} x {item.qty}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => updateQty(item.cartId, 1)}
                        style={{ width: '22px', height: '22px', border: 'none', borderRadius: '50%', background: 'var(--color-gold)', color: 'var(--color-bg-dark)', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        +
                      </button>
                      <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.cartId, -1)}
                        style={{ width: '22px', height: '22px', border: 'none', borderRadius: '50%', background: 'var(--color-gold)', color: 'var(--color-bg-dark)', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Coupon input in drawer */}
              <form
                onSubmit={handleApplyCoupon}
                style={{
                  marginTop: '15px',
                  display: 'flex',
                  gap: '8px',
                  borderTop: '1px dashed var(--glass-border)',
                  paddingTop: '15px',
                }}
              >
                <input
                  type="text"
                  placeholder="Coupon code..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fffbe6',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--color-gold)',
                    color: 'var(--color-bg-dark)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Apply
                </button>
              </form>
              {couponMessage && (
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9em', color: 'var(--color-gold)', textAlign: 'center' }}>
                  {couponMessage}
                </p>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.7 }}>
              <span style={{ fontSize: '3em', display: 'block', marginBottom: '10px' }}>🛒</span>
              Your cart is empty.
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '20px',
              borderTop: '1px solid var(--glass-border)',
              background: 'rgba(16, 38, 38, 0.95)',
            }}
          >
            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>
                <span>Subtotal:</span>
                <span>₹{cartTotalBeforeDiscount}</span>
              </div>
              {couponApplied && cartDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff6b6b' }}>
                  <span>Discount ({couponCode}):</span>
                  <span>-₹{cartDiscount}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  fontSize: '1.25em',
                  color: 'var(--color-gold)',
                  borderTop: '1px solid var(--glass-border)',
                  paddingTop: '8px',
                }}
              >
                <span>Total:</span>
                <span>₹{cartGrandTotal}</span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="buy-now-btn"
                onClick={() => setShowCheckout(true)}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  borderRadius: '25px',
                  fontSize: '1.1em',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Checkout
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setIsCartOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  cursor: 'pointer',
                  padding: '5px',
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Wizard Overlay (opens on top of drawer) */}
      {showCheckout && (
        <>
          <div
            onClick={() => setShowCheckout(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 4000,
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
            }}
          />
          <div
            className="checkout-modal show"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(20, 38, 38, 0.98)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              zIndex: 4001,
              width: '90%',
              maxWidth: '460px',
              padding: '2.5em 2em',
              color: '#fffbe6',
              fontFamily: 'var(--font-body)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCheckout(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                color: '#fffbe6',
                fontSize: '1.8em',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              &times;
            </button>

            {checkoutStep === 'option' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: "var(--font-title)", color: 'var(--color-gold)', fontSize: '1.6em', marginBottom: '0.8em' }}>
                  Choose Checkout Method
                </h3>
                
                <div style={{
                  background: 'rgba(27, 60, 61, 0.4)',
                  border: '1.5px solid var(--color-gold)',
                  borderRadius: '16px',
                  padding: '1.2em',
                  marginBottom: '1.5em',
                }}>
                  <span style={{ fontSize: '2em', display: 'block', marginBottom: '0.2em' }}>🎁</span>
                  <p style={{ margin: 0, fontFamily: "var(--font-title)", fontSize: '1.15em', color: '#fffbe6', lineHeight: '1.4' }}>
                    Get a <b>Flat 10% Discount</b> + extra custom surprises when ordering directly on WhatsApp!
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta"
                    onClick={() => {
                      setShowCheckout(false);
                      setIsCartOpen(false);
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
                    }}
                  >
                    💬 Order via WhatsApp (Best Discount)
                  </a>

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
                    <label htmlFor="drawer-checkout-name" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Full Name</label>
                    <input
                      type="text"
                      id="drawer-checkout-name"
                      required
                      placeholder="Enter recipient's name"
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 251, 230, 0.05)', color: '#fffbe6' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="drawer-checkout-phone" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Phone Number</label>
                    <input
                      type="tel"
                      id="drawer-checkout-phone"
                      required
                      placeholder="Enter mobile number"
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.05)', color: '#fffbe6' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="drawer-checkout-address" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Shipping Address</label>
                    <textarea
                      id="drawer-checkout-address"
                      required
                      placeholder="House No, Street, Landmark, City, State, PIN"
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.05)', color: '#fffbe6', minHeight: '60px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="drawer-checkout-destination" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Shipping Destination</label>
                    <select
                      id="drawer-checkout-destination"
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
                      <label htmlFor="drawer-checkout-country" style={{ fontFamily: "var(--font-title)", color: '#fffbe6', fontSize: '0.9em' }}>Destination Country</label>
                      <input
                        type="text"
                        id="drawer-checkout-country"
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
                      Confirm & Place
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
                  Amma Chethi Vantillu is preparing your delicious food with love! We will reach out to you shortly to coordinate updates.
                </p>
                
                <button
                  className="hero-cta"
                  onClick={() => {
                    setShowCheckout(false);
                    setIsCartOpen(false);
                  }}
                  style={{ border: 'none', cursor: 'pointer', padding: '10px 30px' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
