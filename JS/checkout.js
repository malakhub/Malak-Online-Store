// Checkout page: order summary, form checks and placing the order.

const form = $('#checkout-form');
const errorBox = $('#co-err');
const cart = getCart();

const requiredFields = ['first-name', 'last-name', 'email', 'phone', 'city', 'state', 'address1'];

function showSummary() {
  if (cart.length === 0) {
    $('#co-items').innerHTML = '<p>Your cart is empty. <a href="index.html">Browse products</a></p>';
  } else {
    $('#co-items').innerHTML = cart.map((item) => `
      <div class="row">
        <span>${item.title} × ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>`).join('');
  }
  $('#co-total').textContent = '$' + getCartTotal().toFixed(2);
}

// If the customer is logged in we already know their name and email.
function prefillFromUser() {
  const user = getUser();
  if (!user) return;
  $('#first-name').value = user.firstName;
  $('#last-name').value = user.lastName;
  $('#email').value = user.email;
}

// Returns an error message, or an empty string when everything is fine.
function validateForm() {
  let message = '';

  requiredFields.forEach((id) => {
    const field = $('#' + id);
    const empty = field.value.trim() === '';
    field.classList.toggle('bad', empty);
    if (empty) message = 'Please fill in all the required fields.';
  });
  if (message) return message;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').value.trim())) {
    return 'Please enter a valid email address.';
  }
  if (!/^[0-9+\-\s]{8,}$/.test($('#phone').value.trim())) {
    return 'Please enter a valid phone number (at least 8 digits).';
  }
  if (cart.length === 0) {
    return 'Your cart is empty. Add a product first.';
  }
  return '';
}

function placeOrder() {
  const orderId = 'MK' + Date.now().toString().slice(-6);
  const total = getCartTotal();

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push({ id: orderId, items: cart, total, date: new Date().toISOString() });
  localStorage.setItem('orders', JSON.stringify(orders));

  saveCart([]);
  $('#co').hidden = true;
  $('#success').hidden = false;
  $('#order-no').textContent = `Order ${orderId} is confirmed. Total: $${total.toFixed(2)}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = validateForm();
  errorBox.textContent = message;
  if (!message) placeOrder();
});

showSummary();
prefillFromUser();
