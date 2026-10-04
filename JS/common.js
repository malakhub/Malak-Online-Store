// Shared by every page: header, footer, cart helpers and the logged-in user.

const $ = (selector) => document.querySelector(selector);
const API = 'https://dummyjson.com/products';

/* ---------- cart ---------- */

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function getCartItemCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  document.querySelectorAll('.count-item-header').forEach((badge) => {
    badge.textContent = getCartItemCount();
  });
}

// Fetches the product from DummyJSON so we always store the real price and image.
async function addToCart(id) {
  try {
    const response = await fetch(API + '/' + id);
    const product = await response.json();

    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity: 1
      });
    }

    saveCart(cart);
    showToast('Added to cart');
  } catch (error) {
    showToast('Could not add the item. Please try again.');
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1800);
}

/* ---------- user ---------- */

function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

function logout() {
  localStorage.removeItem('user');
  location.href = 'index.html';
}

/* ---------- header ---------- */

const currentPage = document.body.dataset.page;
const user = getUser();

function activeClass(page) {
  return currentPage === page ? 'class="active"' : '';
}

const accountButtons = user
  ? `<span>Hi, ${user.firstName}</span>
     <a href="#" class="btn" id="logout">Logout <i class="fa-solid fa-right-from-bracket"></i></a>`
  : `<a href="login.html" class="btn">Login <i class="fa-solid fa-right-to-bracket"></i></a>
     <a href="signup.html" class="btn">Signup <i class="fa-solid fa-user-plus"></i></a>`;

$('#site-header').outerHTML = `
<header>
  <div class="top_head">
    <div class="container">
      <a href="index.html" class="logo"><img src="./img/logo.png" alt="Malak Online Store"></a>

      <form class="search-box" id="search-form">
        <div class="select-box">
          <select id="catagory"><option value="">All Categories</option></select>
        </div>
        <input type="text" id="search" placeholder="Search for Products" required>
        <button type="submit" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>

      <div class="header-icons">
        <div class="icon">
          <a href="cart.html" aria-label="Cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="count count-item-header">0</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-head">
    <div class="container">
      <nav class="nav">
        <div class="category-nav">
          <div onclick="Open_Cate_List()" class="category-btn">
            <i class="fa-solid fa-bars"></i>
            <p>Browse</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="category-nav-list" id="cat-list"></div>
        </div>

        <ul class="nav_links">
          <li ${activeClass('home')}><a href="index.html">Home</a></li>
          <li><a href="index.html#products">Products</a></li>
          <li ${activeClass('cart')}><a href="cart.html">Cart</a></li>
          <li ${activeClass('checkout')}><a href="checkout.html">Checkout</a></li>
        </ul>
      </nav>

      <div class="login_signup btns">${accountButtons}</div>
    </div>
  </div>
</header>`;

function Open_Cate_List() {
  $('.category-nav-list').classList.toggle('active');
}

/* ---------- footer + wiring (runs once the page has loaded) ---------- */

const footerHTML = `
<footer class="site-footer">
  <div class="social">
    <a href="https://www.facebook.com" target="_blank"><i class="fa-brands fa-facebook"></i></a>
    <a href="https://www.instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></a>
    <a href="https://www.youtube.com" target="_blank"><i class="fa-brands fa-youtube"></i></a>
    <a href="https://www.tiktok.com" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
  </div>
  <p>&copy; 2026 Malak Online Store. All rights reserved.</p>
</footer>`;

// Loaded once and shared with main.js for the category chips.
const categoriesPromise = fetch(API + '/category-list')
  .then((response) => response.json())
  .catch(() => []);

function prettyName(slug) {
  return slug.replace(/-/g, ' ');
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  updateCartBadge();

  const params = new URLSearchParams(location.search);
  $('#search').value = params.get('q') || '';

  // Searching always goes to the home page, where the product grid lives.
  $('#search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = encodeURIComponent($('#search').value.trim());
    const category = $('#catagory').value;
    location.href = `index.html?q=${text}&cat=${category}#products`;
  });

  if (user) {
    $('#logout').addEventListener('click', (event) => {
      event.preventDefault();
      logout();
    });
  }

  categoriesPromise.then((categories) => {
    $('#catagory').insertAdjacentHTML('beforeend',
      categories.map((c) => `<option value="${c}">${prettyName(c)}</option>`).join(''));
    $('#catagory').value = params.get('cat') || '';

    $('#cat-list').innerHTML = categories.slice(0, 8)
      .map((c) => `<a href="index.html?cat=${c}#products">${prettyName(c)}</a>`).join('');
  });
});
