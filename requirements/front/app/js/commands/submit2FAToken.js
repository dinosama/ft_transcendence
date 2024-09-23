async function submit2FAToken(event) {
  event.preventDefault();

  const token = document.getElementById('input-code').value;

  const payload = {
    token: token,
  };

  const http_adapter = new HttpAdapter('http://localhost:9009/api/submit-2fa-auth/');
  try {
    const loginResponse = await http_adapter.postWithoutCookie(payload);

    if (loginResponse['access']) {
      document.cookie = "access_token=" + loginResponse.access;
      const navigate = new CustomEvent('navigate', { detail: { path: '/dashboard' } });
      document.dispatchEvent(navigate);
    } else if (loginResponse['invalid-2fa']) {
      document.getElementById('form-error').innerHTML = 'Wrong code';
    }
  } catch (error) {
    console.error(error);
  }
}
