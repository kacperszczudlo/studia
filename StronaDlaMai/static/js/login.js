function getInfo() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Walidacja formularza
    if (username.trim() === '' || password.trim() === '') {
        document.getElementById("error-message").innerText = 'Proszę uzupełnić wszystkie pola.';
        return;
    }

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('/login', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("success-message").innerText = data.message;
            document.getElementById("error-message").innerText = '';
            // Tutaj możesz dodać przekierowanie lub dodatkowe działania po zalogowaniu
        } else {
            document.getElementById("error-message").innerText = data.message;
            document.getElementById("success-message").innerText = '';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
