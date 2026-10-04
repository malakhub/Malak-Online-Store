



const swiperContainer = document.getElementById("swiper-products-container");
const sideBanner = document.getElementById("side-banner");

async function getProductsForSwiper() {
  try {
    const [watchesRes, phoneRes] = await Promise.all([
      fetch("https://dummyjson.com/products/category/mens-watches"),
      fetch("https://dummyjson.com/products/category/smartphones?limit=1")
    ]);
    const watches = await watchesRes.json();
    const phone = await phoneRes.json();

    showProductsInSwiper(watches.products);
    showSideBanner(phone.products[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    swiperContainer.innerHTML = "<p>Error</p>";
  }
}

function showProductsInSwiper(products) {
  let html = "";

  products.forEach(product => {
    html += `
      <div class="swiper-slide hero-slide">
        <div class="hero-text">
          <span class="hero-cat">${product.category}</span>
          <h2>${product.title}</h2>
          <p>${product.description.slice(0, 80)}...</p>
          <div class="hero-price">
            Up to <b>${Math.round(product.discountPercentage)}%</b>
            <strong>$${product.price}</strong>
          </div>
          <a href="#" class="shop-btn" onclick="addToCart(${product.id}); return false;">Shop Now <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <img src="${product.thumbnail}" alt="${product.title}">
      </div>
    `;
  });

  swiperContainer.innerHTML = html;

  initSwiper();
}

function showSideBanner(product) {
  sideBanner.innerHTML = `
    <a href="#">
      <span class="new-tag">NEW</span>
      <h3>${product.title}</h3>
      <p>Up to <b>${Math.round(product.discountPercentage)}%</b> off</p>
      <img src="${product.thumbnail}" alt="${product.title}">
    </a>
  `;
}


function initSwiper() {
  var swiper = new Swiper('.slide-swp', {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,          
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true
  });
}

getProductsForSwiper();

/* ---------- product grid (DummyJSON) ---------- */
const grid = document.getElementById("product-grid");
const chips = document.getElementById("chips");
const params = new URLSearchParams(location.search);
let cat = params.get("cat") || "", q = params.get("q") || "";

async function loadProducts() {
  grid.innerHTML = "<p>Loading products...</p>";
  const path = q ? `/search?q=${encodeURIComponent(q)}&limit=24`
             : cat ? `/category/${cat}?limit=24` : "?limit=24";
  document.getElementById("products-title").textContent =
    q ? `Results for "${q}"` : cat ? prettyName(cat) : "Featured products";
  try {
    const data = await (await fetch(API + path)).json();
    grid.innerHTML = data.products.length ? data.products.map(p => `
      <div class="card">
        <img src="${p.thumbnail}" alt="${p.title}" loading="lazy">
        <span class="hero-cat">${prettyName(p.category)}</span>
        <h3>${p.title}</h3>
        <span class="price">$${p.price}</span>
        <button class="btn" onclick="addToCart(${p.id})">Add to cart <i class="fa-solid fa-cart-plus"></i></button>
      </div>`).join("") : "<p>No products found. Try another search.</p>";
  } catch (e) { grid.innerHTML = "<p>Could not load products. Check your connection.</p>"; }
}

categoriesPromise.then(list => {
  chips.innerHTML = ["", ...list.slice(0, 10)].map(c =>
    `<button class="chip ${c === cat && !q ? "on" : ""}" data-c="${c}">${c ? prettyName(c) : "All"}</button>`).join("");
});
chips.addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  cat = b.dataset.c; q = "";
  chips.querySelectorAll(".chip").forEach(x => x.classList.toggle("on", x === b));
  loadProducts();
});
loadProducts();
