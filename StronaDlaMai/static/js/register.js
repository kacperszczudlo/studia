function registerUser() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;

    // Walidacja formularza
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || repeatPassword.trim() === '') {
        document.getElementById("error-message").innerText = 'Proszę uzupełnić wszystkie pola.';
        return;
    }

    if (username.length > 15 || /\s/.test(username)) {
        document.getElementById("error-message").innerText = 'Nazwa użytkownika nie może zawierać więcej niż 15 znaków ani spacji.';
        return;
    }

    if (!email.includes('@')) {
        document.getElementById("error-message").innerText = 'Email musi zawierać znak @.';
        return;
    }

    if (password.length < 12) {
        document.getElementById("error-message").innerText = 'Hasło musi mieć co najmniej 12 znaków.';
        return;
    }

    if (password !== repeatPassword) {
        document.getElementById("error-message").innerText = 'Hasła nie są zgodne.';
        return;
    }

    var formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('repeatPassword', repeatPassword);

    fetch('/register', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("success-message").innerText = data.message;
            document.getElementById("error-message").innerText = '';
        } else {
            document.getElementById("error-message").innerText = data.message;
            document.getElementById("success-message").innerText = '';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
