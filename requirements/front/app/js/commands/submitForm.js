async function submitForm(event) {
    event.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const TwoFA = document.getElementById('TwoFA').checked;

    if (password !== confirmPassword) {
        document.getElementById("form-error").innerHTML = "Passwords don't match";
        return ;
    }

    if (password.length < 8) {
        document.getElementById("form-error").innerHTML = "The password does not contain 8 char";
        return ;
    }

    const payload = {
        username: username,
        email: email,
        password: password,
        TwoFA: TwoFA
    };

    const http_adapter = new HttpAdapter('http://localhost:9009/api/user/');
    try {
        const response = await http_adapter.createWithoutCookie(payload);
        if (response.ok) {
            var countdownElement = document.getElementById('countdown');
            var seconds = 4;

            countdownElement.textContent = "Successful registration, you will be redirected in " + seconds + " seconds";
            var interval = setInterval(function() {
                seconds--;
                countdownElement.textContent = "Successful registration, you will be redirected in " + seconds + " seconds";
                if (seconds <= 0) {
                    clearInterval(interval);
                    const navigate = new CustomEvent('navigate', { detail: { path: '/' } });
                    document.dispatchEvent(navigate);
                }
            }, 1000);
        } else {
            const data = await response.json();
            if (data.email)
                document.getElementById("form-error").innerHTML = data.email; 
            else if (data.username)
                document.getElementById("form-error").innerHTML = data.username;
            };
    } catch (error) {
        console.error('Error:', error);
    }
}