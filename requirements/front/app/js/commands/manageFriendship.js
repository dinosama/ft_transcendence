async function manageFriendship(action, userId) {
  const http_adapter = new HttpAdapter('http://localhost:9009/api/friend/');
  const loginResponse = await http_adapter.updateWithCookie({ action, userId });
}
