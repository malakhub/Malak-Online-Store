# 🛒 Malak Online Store

A clean, multi-page e-commerce storefront built with pure HTML, CSS, and vanilla JavaScript. Products come live from the free [DummyJSON](https://dummyjson.com) API, and the cart, accounts, and orders all work in the browser with no backend and no build step.

---

## 🌐 Live Demo

[View the live website](https://malakhub.github.io/Malak-Online-Store/)

---

## ✨ Overview

Malak Online Store is a complete shopping flow from browsing to checkout. A visitor can explore a hero slider, filter products by category, search the catalog, add items to a cart, create an account, and place an order. Every page shares the same header and footer, so the whole site feels consistent and is easy to restyle.

Product data, images, and prices are fetched from DummyJSON, which makes it a good starting point for practicing API work or as a template for a real store front end.

---

## 🚀 Features

- 🧭 **Sticky header** with logo, search bar, category dropdown, live cart counter, and login or logout buttons
- 🎞️ **Hero slider** powered by Swiper, showing featured watches plus a side banner for a featured phone
- 🛍️ **Live product grid** loaded from the DummyJSON API, with category chips to filter
- 🔎 **Search and category filter** from the header, with results shown on the home page
- 🛒 **Working cart** that saves to `localStorage`, with increase, decrease, and remove buttons and an automatic total
- 💳 **Checkout form** with validation for required fields, email, and phone, plus an order summary and an order confirmation number
- 👤 **Separate login and signup pages** with clear validation messages, saved accounts, and a personalised greeting in the header
- 🔔 **Toast notifications** when an item is added to the cart
- 🎨 **Easy theming** through CSS variables in one place

---

## 🧰 Tech Stack

| Area | Tools |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Logic | Vanilla JavaScript (ES6+), `fetch`, `localStorage` |
| Data | [DummyJSON Products API](https://dummyjson.com/docs/products) |
| Libraries | [Swiper](https://swiperjs.com) for the slider, [Font Awesome](https://fontawesome.com) for icons (both via CDN) |

---

## 📁 Project Structure

```
malak-online-store/
├── index.html          # Home page: slider and product grid
├── cart.html           # Shopping cart
├── checkout.html       # Checkout form and order summary
├── login.html          # Login page
├── signup.html         # Signup page
├── CSS/
│   ├── style.css       # Shared styles, header, home page
│   └── pages.css       # Cart, checkout, and account pages
├── JS/
│   ├── common.js       # Header, footer, cart helpers, current user
│   ├── main.js         # Home page: slider, products, categories
│   ├── cart.js         # Cart page logic
│   ├── checkout.js     # Checkout validation and order placement
│   ├── auth.js         # Shared login and signup helpers
│   ├── login.js        # Login logic
│   └── signup.js       # Signup logic
└── img/
    ├── logo.png        # Header logo
    └── icon.png        # Browser tab icon
```

---

## ⚡ Getting Started

No installation is needed.

```bash
# 1. Clone the repository
git clone https://github.com/malakhub/Malak-Online-Store.git

# 2. Open the folder
cd Malak-Online-Store

# 3. Open index.html in your browser
```

For the best experience, serve the folder with a simple local server, such as the **Live Server** extension in VS Code, or:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. An internet connection is required because products, the slider library, and the icons load from the web.

---

## 🎨 Customization

**Branding.** Replace `img/logo.png` and `img/icon.png` with your own files and keep the same names.

**Colors and fonts.** All main colors live in the `:root` block at the top of `CSS/style.css`:

```css
:root {
    --main_color: #ff8716;
    --color_heading: #121416;
    --bg_color: #F3F3F3;
}
```

**Header and footer.** Edit them once in `JS/common.js` and every page updates.

**Products.** Change the endpoints in `JS/main.js` to show other DummyJSON categories in the slider, or point the `API` constant in `JS/common.js` at your own backend.

---

## 🔐 How Data Is Stored

Everything is saved in the browser's `localStorage`:

| Key | Contents |
| --- | --- |
| `cart` | Items, prices, and quantities |
| `users` | Registered accounts |
| `user` | The currently logged-in user |
| `orders` | Orders placed at checkout |

> ⚠️ **Note:** This is a front-end demo. Passwords are stored in plain text in the browser, and payments are not processed. A real store needs a secure backend for authentication, payments, and orders.

---

## 🗺️ Roadmap

- [ ] Product details page
- [ ] Wishlist
- [ ] Pagination or "load more" for products
- [ ] Sorting by price and rating
- [ ] Better mobile layout for the header
- [ ] Real backend for accounts and orders

---

## 👩‍💻 Author

**Malak**
GitHub: [@malakhub](https://github.com/malakhub)

---

## 🙏 Credits

- Product data and images by [DummyJSON](https://dummyjson.com)
- Slider by [Swiper](https://swiperjs.com)
- Icons by [Font Awesome](https://fontawesome.com)
