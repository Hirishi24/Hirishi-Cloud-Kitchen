window.cart = JSON.parse(localStorage.getItem('cart') || '{}');
function addToCart(id, name, price) {
  if (!window.cart[id]) window.cart[id] = { name, price, qty: 1 };
  else window.cart[id].qty++;
  localStorage.setItem('cart', JSON.stringify(window.cart));
  alert('Added to cart!');
} 