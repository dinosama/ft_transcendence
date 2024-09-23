async function submitLoginForm(event) {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const http_adapter = new HttpAdapter('http://localhost:9009/api/user/');
  try {
      const loginResponse = await http_adapter.doLogin({ username, password });

      if (loginResponse['2fa-required']) {
        const navigate = new CustomEvent('navigate', { detail: { path: '/twoFaAuthentication' } });
        document.dispatchEvent(navigate);
      } else if (loginResponse['detail']) {
        document.getElementById('form-error').innerHTML = 'No account found with this credentials';
      } else {
          document.cookie = "access_token=" + loginResponse.access;
          const navigate = new CustomEvent('navigate', { detail: { path: '/dashboard' } });
          document.dispatchEvent(navigate);
      }
  } catch (error) {
      console.error(error);
  }
}
