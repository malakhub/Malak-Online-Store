// Signup page.

$('#signup_form').addEventListener('submit', (event) => {
  event.preventDefault();

  const firstName = $('#signup_firstname').value.trim();
  const lastName = $('#signup_lastname').value.trim();
  const email = $('#signup_email').value.trim().toLowerCase();
  const password = $('#signup_password').value;
  const confirm = $('#signup_confirm').value;

  const emailTaken = getUsers().some((u) => u.email === email);

  // run every check so all the errors show at once
  const results = [
    setFieldError('signup_firstname', firstName.length < 2 ? 'First name must be at least 2 characters' : ''),
    setFieldError('signup_lastname', lastName.length < 2 ? 'Last name must be at least 2 characters' : ''),
    setFieldError('signup_email',
      !isValidEmail(email) ? 'Please enter a valid email'
      : emailTaken ? 'This email already has an account. Try logging in.'
      : ''),
    setFieldError('signup_password', password.length < 8 ? 'Password must be at least 8 characters' : ''),
    setFieldError('signup_confirm', confirm !== password ? 'Passwords do not match' : '')
  ];
  if (results.includes(false)) return;

  const newUser = { firstName, lastName, email, password };
  localStorage.setItem('users', JSON.stringify([...getUsers(), newUser]));
  logIn(newUser);
});
