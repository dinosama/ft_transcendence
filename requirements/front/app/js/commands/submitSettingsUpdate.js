async function submitSettingsUpdate(event) {
  event.preventDefault();

  const getImageFromPath = () => {
    return new Promise((resolve, reject) => {
      const element = document.getElementById('file-input');
      const image = element.files[0];
      
      if (!image) {
        resolve(undefined); 
        return;
      }

      const reader = new FileReader();

      reader.onload = function(event) {
        const binaryImageData = event.target.result;
        const base64ImageData = btoa(binaryImageData);
        resolve(base64ImageData);
      };

      reader.onerror = function(error) {
        reject(error);
      };

      reader.readAsBinaryString(image);
    });
  };

  const TwoFA = document.getElementById('TwoFA').checked;
  const username = document.getElementById('username-ent').value;
  const email = document.getElementById('email-ent').value;
  const password = document.getElementById('password-ent').value;
  const confirmPassword = document.getElementById('confirmPassword-ent').value;
  const savePassword = document.getElementById('savePassword-ent').value;
  const profilePicture = await getImageFromPath();
  
  const payload = {
    TwoFA: TwoFA,
    username: username,
    email: email,
    password: password,
    savePassword: savePassword,
    profilePicture: profilePicture
  };

  if (password === "" && confirmPassword !== "" 
    || password !== "" && confirmPassword === "") {
      document.getElementById("form-error").innerHTML = "Confirm the new password";
      return ;
  }

  if (password !== confirmPassword) {
    document.getElementById("form-error").innerHTML = "Passwords don't match";
    return ;
  }

  if (password !== "" && confirmPassword !== "") {
    if (password.length < 8) {
      document.getElementById("form-error").innerHTML = "The password does not contain 8 char";
      return ;
    }
  }

  document.getElementById("form-error").innerHTML = "";
  
  const http_adapter = new HttpAdapter('http://localhost:9009/api/user/');
  try {
    const loginResponse = await http_adapter.updateWithCookie(payload);

    if (loginResponse['success']) {
      var countdownElement = document.getElementById('countdown');
      var seconds = 4;

      countdownElement.textContent = "Successful modifications, you will be redirected in " + seconds + " seconds";
      var interval = setInterval(function() {
          seconds--;
          countdownElement.textContent = "Successful modifications, you will be redirected in " + seconds + " seconds";
          if (seconds <= 0) {
              clearInterval(interval);
              const navigate = new CustomEvent('navigate', { detail: { path: '/dashboard' } });
              document.dispatchEvent(navigate);
          }
      }, 1000);
    } else if (loginResponse['error'] == "Wrong password") {
      document.getElementById('form-error').innerHTML = 'Wrong password';
    }
  } catch (error) {
    console.error(error);
  }
}
