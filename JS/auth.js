// Small helpers shared by the login and signup pages.

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

// Shows (or clears) the error under one input. Returns true when the field is fine.
function setFieldError(inputId, message) {
  $('#' + inputId + '_err').textContent = message;
  $('#' + inputId).classList.toggle('bad', message !== '');
  return message === '';
}

// Remember who is logged in (never store the password in the session) and go home.
function logIn(user) {
  localStorage.setItem('user', JSON.stringify({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }));
  location.href = 'index.html';
}
