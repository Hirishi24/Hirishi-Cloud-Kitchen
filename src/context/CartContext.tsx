import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  cartId: string; // e.g., "chicken-bone-250g"
  productId: string;
  name: string;
  weightLabel: string;
  price: number;
  qty: number;
}

interface CartContextType {
  cart: { [key: string]: CartItem };
  cartBadgeCount: number;
  cartTotalBeforeDiscount: number;
  cartDiscount: number;
  cartGrandTotal: number;
  couponApplied: boolean;
  couponCode: string;
  couponExpireTime: number | null;
  addToCart: (productId: string, productName: string, weightLabel: string, price: number) => void;
  updateQty: (cartId: string, delta: number) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : {};
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponExpireTime, setCouponExpireTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('hirishi_coupon_expire');
    if (saved) {
      const expire = parseInt(saved);
      if (expire > Date.now()) {
        return expire;
      } else {
        localStorage.removeItem('hirishi_coupon_expire');
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Sync cart badge and restore coupon state
  useEffect(() => {
    if (couponExpireTime) {
      const expire = parseInt(localStorage.getItem('hirishi_coupon_expire') || '0');
      if (expire > Date.now()) {
        setCouponApplied(true);
        // We will re-calculate discount in the state selectors below
      } else {
        // Expired
        handleCouponExpire();
      }
    }
  }, [couponExpireTime]);

  // Handle active coupon countdown timer
  useEffect(() => {
    if (!couponApplied || !couponExpireTime) return;

    const timer = setInterval(() => {
      if (Date.now() >= couponExpireTime) {
        handleCouponExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [couponApplied, couponExpireTime]);

  const handleCouponExpire = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponCode('');
    setCouponExpireTime(null);
    localStorage.removeItem('hirishi_coupon_expire');
  };

  const addToCart = (productId: string, productName: string, weightLabel: string, price: number) => {
    const cartId = `${productId}-${weightLabel}`;
    setCart((prevCart) => {
      const updated = { ...prevCart };
      if (!updated[cartId]) {
        updated[cartId] = {
          cartId,
          productId,
          name: `${productName} (${weightLabel})`,
          weightLabel,
          price,
          qty: 1,
        };
      } else {
        updated[cartId] = {
          ...updated[cartId],
          qty: updated[cartId].qty + 1,
        };
      }
      return updated;
    });
    // Mini cart bar on the Pickles page shows added items instead
  };

  const updateQty = (cartId: string, delta: number) => {
    setCart((prevCart) => {
      const updated = { ...prevCart };
      if (!updated[cartId]) return prevCart;

      const newQty = updated[cartId].qty + delta;
      if (newQty <= 0) {
        delete updated[cartId];
      } else {
        updated[cartId] = {
          ...updated[cartId],
          qty: newQty,
        };
      }
      return updated;
    });
  };

  const removeItem = (cartId: string) => {
    setCart((prevCart) => {
      const updated = { ...prevCart };
      delete updated[cartId];
      return updated;
    });
  };

  const clearCart = () => {
    setCart({});
    handleCouponExpire();
  };

  // Selectors
  const cartBadgeCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotalBeforeDiscount = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);

  // Auto calculate discount based on total and code
  useEffect(() => {
    if (!couponApplied || !couponCode) {
      setCouponDiscount(0);
      return;
    }
    const cleanCode = couponCode.toLowerCase();
    if (cleanCode === 'hirishi10') {
      if (cartTotalBeforeDiscount > 2000) {
        setCouponDiscount(Math.round(cartTotalBeforeDiscount * 0.10));
      } else {
        // Condition no longer met
        handleCouponExpire();
      }
    } else if (cleanCode === 'rapparappa50') {
      if (cartTotalBeforeDiscount >= 1000) {
        setCouponDiscount(50);
      } else {
        // Condition no longer met
        handleCouponExpire();
      }
    }
  }, [cartTotalBeforeDiscount, couponApplied, couponCode]);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim();
    if (cleanCode.includes('!')) {
      return {
        success: false,
        message: 'Hey! Please remove the exclamation mark ( ! ) from the code. Just use HIRISHI10 or RappaRappa50 😊',
      };
    }

    const codeLower = cleanCode.toLowerCase();
    if (codeLower === 'hirishi10') {
      if (cartTotalBeforeDiscount > 2000) {
        const discount = Math.round(cartTotalBeforeDiscount * 0.10);
        const expire = Date.now() + 10 * 60 * 1000; // 10 minutes
        localStorage.setItem('hirishi_coupon_expire', expire.toString());
        setCouponApplied(true);
        setCouponCode(cleanCode);
        setCouponDiscount(discount);
        setCouponExpireTime(expire);
        return { success: true, message: '🎉 Coupon applied! 10% off' };
      } else {
        return { success: false, message: '❌ Add more items to reach ₹2000 for this coupon!' };
      }
    } else if (codeLower === 'rapparappa50') {
      if (cartTotalBeforeDiscount >= 1000) {
        const expire = Date.now() + 10 * 60 * 1000;
        localStorage.setItem('hirishi_coupon_expire', expire.toString());
        setCouponApplied(true);
        setCouponCode(cleanCode);
        setCouponDiscount(50);
        setCouponExpireTime(expire);
        return { success: true, message: '🎉 Coupon applied! ₹50 off' };
      } else {
        return { success: false, message: '❌ Add more items to reach ₹1000 for this coupon!' };
      }
    } else {
      return { success: false, message: '❌ Invalid coupon. Try HIRISHI10 or RappaRappa50!' };
    }
  };

  const removeCoupon = () => {
    handleCouponExpire();
  };

  const cartGrandTotal = Math.max(0, cartTotalBeforeDiscount - couponDiscount);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartBadgeCount,
        cartTotalBeforeDiscount,
        cartDiscount: couponDiscount,
        cartGrandTotal,
        couponApplied,
        couponCode,
        couponExpireTime,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
