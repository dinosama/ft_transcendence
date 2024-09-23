async function submitFindFriends(event) {
    event.preventDefault();
  
    const username = document.getElementById('dashboard-find-friends').value;
  
    const payload = {
      username: username,
    };
  
    const http_adapter = new HttpAdapter('http://localhost:9009/api/friend/');
    try {
        const loginResponse = await http_adapter.postWithCookie(payload);

      if (loginResponse['error'] == "User does not exist") {
        document.getElementById("form-error").innerHTML = loginResponse['error'];
        document.getElementById('form-validate').innerHTML = "";
      } else if (loginResponse['error'] == "Friendship request already exists") {
        document.getElementById('form-error').innerHTML = loginResponse['error'];
        document.getElementById('form-validate').innerHTML = "";
      } else {
        document.getElementById('form-validate').innerHTML = "Friend request sent successfully";
        document.getElementById('form-error').innerHTML = "";
      }
    } catch (error) {
      console.error(error);
    }
  }