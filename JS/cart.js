// Cart page: shows the items and handles the +, - and remove buttons.

const itemsBox = $('#cart-items');

function itemHTML(item) {
  const lineTotal = (item.price * item.quantity).toFixed(2);
  return `
    <div class="item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p class="price">$${lineTotal}</p>
      </div>
      <div class="qty">
        <button data-action="decrease" aria-label="Decrease quantity">−</button>
        <span>${item.quantity}</span>
        <button data-action="increase" aria-label="Increase quantity">+</button>
      </div>
      <button class="rm" data-action="remove" aria-label="Remove item">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>`;
}

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    itemsBox.innerHTML = '<p class="empty">Your cart is empty. <a href="index.html">Browse products</a></p>';
  } else {
    itemsBox.innerHTML = cart.map(itemHTML).join('');
  }

  $('#sum-items').textContent = getCartItemCount();
  $('#cart-total').textContent = '$' + getCartTotal().toFixed(2);

  // can't check out with nothing in the cart
  $('#to-checkout').classList.toggle('disabled', cart.length === 0);
}

itemsBox.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  const row = event.target.closest('.item');
  if (!button || !row) return;

  const id = Number(row.dataset.id);
  let cart = getCart();
  const item = cart.find((product) => product.id === id);
  const action = button.dataset.action;

  if (action === 'increase') {
    item.quantity++;
  } else if (action === 'decrease' && item.quantity > 1) {
    item.quantity--;
  } else if (action === 'remove') {
    cart = cart.filter((product) => product.id !== id);
  }

  saveCart(cart);
  renderCart();
});

renderCart();
