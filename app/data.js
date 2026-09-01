const PRODUCTS = [
  { id: 'backpack', name: 'Sauce Labs Backpack', price: 29.99 },
  { id: 'bike-light', name: 'Sauce Labs Bike Light', price: 9.99 },
  { id: 'bolt-shirt', name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  { id: 'fleece-jacket', name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  { id: 'onesie', name: 'Sauce Labs Onesie', price: 7.99 },
];

function getCart() {
  return JSON.parse(sessionStorage.getItem('qa_demo_cart') || '[]');
}
function setCart(cart) {
  sessionStorage.setItem('qa_demo_cart', JSON.stringify(cart));
}
function requireAuth() {
  if (!sessionStorage.getItem('qa_demo_user')) {
    window.location.href = 'index.html';
  }
}
function renderCartBadge() {
  const cart = getCart();
  const badge = document.querySelector('.shopping_cart_badge');
  if (!badge) return;
  if (cart.length > 0) {
    badge.textContent = String(cart.length);
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}
