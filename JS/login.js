// Login page.

$('#login_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = $('#login_email').value.trim().toLowerCase();
  const password = $('#login_password').value;

  // find the account first so we can give one clear error
  const account = getUsers().find((u) => u.email === email && u.password === password);

  const emailOk = setFieldError('login_email',
    isValidEmail(email) ? '' : 'Please enter a valid email');

  const passwordOk = setFieldError('login_password',
    password === '' ? 'Please enter your password'
    : (emailOk && !account) ? 'Email or password is incorrect'
    : '');

  if (emailOk && passwordOk) logIn(account);
});
