import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingCart, MessageCircle, Package, ArrowLeft, PartyPopper, Trash2 } from 'lucide-react';

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA / Canada" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+61", country: "Australia" },
  { code: "+65", country: "Singapore" },
  { code: "+60", country: "Malaysia" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+968", country: "Oman" },
  { code: "+965", country: "Kuwait" },
  { code: "+974", country: "Qatar" },
  { code: "+973", country: "Bahrain" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+64", country: "New Zealand" }
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export const CartDrawer: React.FC = () => {
  const {
    cart, cartTotalBeforeDiscount, cartDiscount, cartGrandTotal,
    couponApplied, couponCode, updateQty, clearCart,
    isCartOpen, setIsCartOpen, applyCoupon,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'option' | 'details' | 'success'>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    streetAddress: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    isInternational: false,
    country: 'India'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isdCode, setIsdCode] = useState('+91');

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!shippingDetails.fullName.trim()) {
      errs.fullName = "Full Name is required.";
    } else if (shippingDetails.fullName.trim().length < 3) {
      errs.fullName = "Full Name must be at least 3 characters.";
    }
    
    if (!shippingDetails.phone.trim()) {
      errs.phone = "Phone Number is required.";
    } else {
      const cleanPhone = shippingDetails.phone.replace(/\D/g, '');
      if (isdCode === '+91') {
        if (cleanPhone.length !== 10) {
          errs.phone = "Please enter a 10-digit mobile number.";
        }
      } else {
        if (cleanPhone.length < 7 || cleanPhone.length > 15) {
          errs.phone = "Please enter a valid mobile number (7-15 digits).";
        }
      }
    }
    
    if (!shippingDetails.streetAddress.trim()) {
      errs.streetAddress = "Street Address is required.";
    }
    
    if (!shippingDetails.city.trim()) {
      errs.city = "City is required.";
    }
    
    if (!shippingDetails.state) {
      errs.state = "Select a State.";
    }
    
    if (!shippingDetails.pincode.trim()) {
      errs.pincode = "Pincode is required.";
    } else {
      const cleanPincode = shippingDetails.pincode.replace(/\D/g, '');
      if (cleanPincode.length !== 6) {
        errs.pincode = "Enter a 6-digit Pincode.";
      }
    }
    
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getIntlWhatsAppLink = () => {
    const phone = '919573969154';
    let msg = 'Hello Hirishi Cloud Kitchen! I would like to place an international order:\n\n';
    cartItems.forEach((item) => { msg += `• ${item.qty} x ${item.name} (${item.weightLabel}) - ₹${item.price * item.qty}\n`; });
    msg += `\nSubtotal: ₹${cartTotalBeforeDiscount}`;
    if (couponApplied && cartDiscount > 0) msg += `\nCoupon Applied: ${couponCode} (-₹${cartDiscount})`;
    msg += `\nTotal: ₹${cartGrandTotal}\n\n`;
    msg += `Please let me know the shipping options and total amount for delivery outside India. Thanks!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    if (!isCartOpen) { setCheckoutStep('cart'); setCouponMsg(null); }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const cartItems = Object.values(cart);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, ok: res.success });
  };

  const getWhatsAppLink = (addrDetails = shippingDetails) => {
    const phone = '919573969154';
    let msg = 'Hello Hirishi Cloud Kitchen! I would like to place an order:\n\n';
    cartItems.forEach((item) => { msg += `• ${item.qty} x ${item.name} (${item.weightLabel}) - ₹${item.price * item.qty}\n`; });
    msg += `\nSubtotal: ₹${cartTotalBeforeDiscount}`;
    if (couponApplied && cartDiscount > 0) msg += `\nCoupon Applied: ${couponCode} (-₹${cartDiscount})`;
    
    msg += `\nTotal: ₹${cartGrandTotal}\n\n`;
    
    if (addrDetails.fullName) {
      msg += `*Customer Details:*\n`;
      msg += `Name: ${addrDetails.fullName}\n`;
      if (addrDetails.phone) msg += `Phone: ${isdCode} ${addrDetails.phone}\n`;
      
      const fullAddress = [
        addrDetails.streetAddress,
        addrDetails.landmark ? `(Landmark: ${addrDetails.landmark})` : '',
        addrDetails.city,
        addrDetails.state,
        addrDetails.pincode,
        addrDetails.country
      ].filter(Boolean).join(', ');
      
      if (fullAddress) msg += `Address: ${fullAddress}\n\n`;
    }
    
    msg += `Please process this order. Thanks!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-drawer-backdrop show" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer show">
        <div className="cart-header">
          <h3 className="cart-title">
            {checkoutStep === 'cart' ? `Your Cart (${cartItems.length})` :
             checkoutStep === 'option' ? 'Checkout' :
             checkoutStep === 'details' ? 'Shipping Details' : 'Order Placed!'}
          </h3>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}><X size={18} /></button>
        </div>

        {checkoutStep === 'cart' && (
          <>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon"><ShoppingCart size={48} /></div>
                  <div className="cart-empty-text">Your cart is empty</div>
                  <button className="btn-secondary" onClick={() => setIsCartOpen(false)} style={{ maxWidth: '200px', margin: '0 auto' }}>
                    Browse Menu
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="cart-item" key={item.cartId}>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-weight">{item.weightLabel}</div>
                      <div className="cart-item-price">₹{item.price * item.qty}</div>
                    </div>
                    <div className="cart-qty-controls">
                      <button className="cart-qty-btn" onClick={() => updateQty(item.cartId, -1)}><Minus size={14} /></button>
                      <span className="cart-qty-value">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateQty(item.cartId, 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <form className="coupon-form" onSubmit={handleApplyCoupon}>
                  <input className="coupon-input" placeholder="Coupon code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                  <button type="submit" className="coupon-apply-btn">Apply</button>
                </form>
                {couponMsg && <div className={`coupon-message ${couponMsg.ok ? 'success' : 'error'}`}>{couponMsg.text}</div>}

                <div className="cart-total-row"><span>Subtotal</span><span>₹{cartTotalBeforeDiscount}</span></div>
                {cartDiscount > 0 && (
                  <div className="cart-total-row" style={{ color: '#4ade80' }}><span>Discount ({couponCode})</span><span>-₹{cartDiscount}</span></div>
                )}
                <div className="cart-total-row grand"><span>Total</span><span>₹{cartGrandTotal}</span></div>

                <button className="cart-checkout-btn" onClick={() => setCheckoutStep('option')}>
                  Proceed to Checkout
                </button>
                <button onClick={clearCart} style={{ color: 'var(--text-muted)', fontSize: '0.8em', textAlign: 'center', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Trash2 size={14} /> Clear Cart
                </button>
              </div>
            )}
          </>
        )}

        {checkoutStep === 'option' && (
          <div className="checkout-step">
            <div className="checkout-option" onClick={() => window.open(getWhatsAppLink(), '_blank')}>
              <div className="checkout-option-icon"><MessageCircle size={32} /></div>
              <div className="checkout-option-text">
                <div className="checkout-option-title">Order via WhatsApp</div>
                <div className="checkout-option-desc">Get the best discount! Chat directly with us</div>
              </div>
            </div>
            <div className="checkout-option" onClick={() => setCheckoutStep('details')}>
              <div className="checkout-option-icon"><Package size={32} /></div>
              <div className="checkout-option-text">
                <div className="checkout-option-title">Continue Here</div>
                <div className="checkout-option-desc">Fill shipping details and place order</div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => setCheckoutStep('cart')} style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} /> Back to Cart
            </button>
          </div>
        )}

        {checkoutStep === 'details' && (
          <div className="checkout-step">
            <div className="checkout-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontFamily: "var(--font-title)", fontSize: '0.9em' }}>Shipping Destination</label>
              <select
                className="form-input"
                value={shippingDetails.isInternational ? 'intl' : 'domestic'}
                onChange={(e) => {
                  const isIntl = e.target.value === 'intl';
                  setShippingDetails({
                    ...shippingDetails,
                    isInternational: isIntl,
                    country: isIntl ? '' : 'India'
                  });
                }}
                style={{ background: '#1b3c3d', color: '#fffbe6' }}
              >
                <option value="domestic">🇮🇳 India Delivery</option>
                <option value="intl">🌎 International Delivery (Worldwide)</option>
              </select>

              {shippingDetails.isInternational ? (
                <div style={{
                  background: 'rgba(27, 60, 61, 0.4)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1em',
                  textAlign: 'center',
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '2em' }}>🌎</span>
                  <h4 style={{ fontFamily: "var(--font-title)", color: '#fffbe6', margin: 0 }}>International Orders</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85em', lineHeight: '1.4', margin: 0 }}>
                    International shipping fees and delivery regulations are country-specific. Please tap below to message us directly on WhatsApp to coordinate your order!
                  </p>
                  <a
                    href={getIntlWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cart-whatsapp-btn"
                    onClick={() => {
                      clearCart();
                      setIsCartOpen(false);
                    }}
                    style={{
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg, #25D366, #128C7E)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '25px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    💬 Coordinate on WhatsApp
                  </a>
                  <button className="btn-secondary" onClick={() => setCheckoutStep('option')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '5px' }}>
                    <ArrowLeft size={16} /> Back
                  </button>
                </div>
              ) : (
                <>
                  <label>Full Name *</label>
                  <input 
                    className="form-input" 
                    value={shippingDetails.fullName} 
                    onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })} 
                    placeholder="Recipient's name" 
                  />
                  {formErrors.fullName && <span style={{ color: '#ff8b94', fontSize: '0.8em', marginTop: '-6px' }}>{formErrors.fullName}</span>}
                  
                  <label>Phone Number *</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={isdCode}
                      onChange={(e) => setIsdCode(e.target.value)}
                      style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: '#1b3c3d', color: '#fffbe6' }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.country} ({c.code})</option>
                      ))}
                    </select>
                    <input 
                      className="form-input" 
                      style={{ flex: 1 }}
                      value={shippingDetails.phone} 
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })} 
                      placeholder="Mobile number" 
                    />
                  </div>
                  {formErrors.phone && <span style={{ color: '#ff8b94', fontSize: '0.8em', marginTop: '-6px' }}>{formErrors.phone}</span>}
                  
                  <label>Flat, House No, Street *</label>
                  <input 
                    className="form-input" 
                    value={shippingDetails.streetAddress} 
                    onChange={(e) => setShippingDetails({ ...shippingDetails, streetAddress: e.target.value })} 
                    placeholder="Flat/House No, Building, Street" 
                  />
                  {formErrors.streetAddress && <span style={{ color: '#ff8b94', fontSize: '0.8em', marginTop: '-6px' }}>{formErrors.streetAddress}</span>}
                  
                  <label>Landmark (Optional)</label>
                  <input 
                    className="form-input" 
                    value={shippingDetails.landmark} 
                    onChange={(e) => setShippingDetails({ ...shippingDetails, landmark: e.target.value })} 
                    placeholder="Near temple/shop/etc." 
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label>City / Town *</label>
                      <input 
                        className="form-input" 
                        value={shippingDetails.city} 
                        onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })} 
                        placeholder="City" 
                      />
                      {formErrors.city && <span style={{ color: '#ff8b94', fontSize: '0.8em' }}>{formErrors.city}</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label>State *</label>
                      <select
                        className="form-input"
                        value={shippingDetails.state}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                        style={{ background: '#1b3c3d', color: '#fffbe6' }}
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {formErrors.state && <span style={{ color: '#ff8b94', fontSize: '0.8em' }}>{formErrors.state}</span>}
                    </div>
                  </div>

                  <label>Pincode *</label>
                  <input 
                    className="form-input" 
                    value={shippingDetails.pincode} 
                    onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })} 
                    placeholder="6-digit ZIP code" 
                  />
                  {formErrors.pincode && <span style={{ color: '#ff8b94', fontSize: '0.8em', marginTop: '-6px' }}>{formErrors.pincode}</span>}

                  <button 
                    className="cart-checkout-btn" 
                    onClick={() => {
                      if (validateForm()) {
                        setCheckoutStep('success');
                      }
                    }}
                    style={{ marginTop: '10px' }}
                  >
                    Continue to Order — ₹{cartGrandTotal}
                  </button>
                  <button className="btn-secondary" onClick={() => setCheckoutStep('option')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={16} /> Back
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {checkoutStep === 'success' && (
          <div className="checkout-success">
            <div className="checkout-success-icon"><PartyPopper size={64} /></div>
            <h3>Order Recorded! Continue to Payment</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.92em', lineHeight: '1.4' }}>
              Your details have been saved. To secure your <strong>Maximum Discount & Free Shipping</strong> and complete payment, continue to our WhatsApp payment gateway.
            </p>
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cart-whatsapp-btn" 
              onClick={() => {
                clearCart();
                setIsCartOpen(false);
              }}
              style={{ 
                textDecoration: 'none', 
                background: 'linear-gradient(135deg, #25D366, #128C7E)', 
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: '25px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
              }}
            >
              <MessageCircle size={18} /> Continue to WhatsApp for Max Discount
            </a>
          </div>
        )}
      </div>
    </>
  );
};
