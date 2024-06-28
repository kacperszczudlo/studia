const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Parser dla danych formularza
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Dodano do obsługi JSON

// Serwowanie statycznych plików z katalogu 'static'
app.use(express.static(path.join(__dirname, 'static')));

// Obsługa żądania GET dla strony głównej
app.get('/', (req, res) => {
    res.redirect('/login.html'); // Przekierowanie na stronę logowania
});

// Obsługa logowania
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Tutaj dodaj logikę weryfikacji danych logowania
    if (username === 'poprawny_login' && password === 'poprawne_haslo') {
        res.json({ success: true, message: 'Zalogowano pomyślnie!' });
    } else {
        res.json({ success: false, message: 'Nieprawidłowa nazwa użytkownika lub hasło.' });
    }
});

// Obsługa rejestracji
app.post('/register', (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    // Walidacja danych rejestracyjnych
    if (username.length > 15 || /\s/.test(username)) {
        return res.json({ success: false, message: 'Nazwa użytkownika nie może zawierać więcej niż 15 znaków ani spacji.' });
    }
    if (!email.includes('@')) {
        return res.json({ success: false, message: 'Email musi zawierać znak @.' });
    }
    if (password.length < 12) {
        return res.json({ success: false, message: 'Hasło musi mieć co najmniej 12 znaków.' });
    }
    if (password !== repeatPassword) {
        return res.json({ success: false, message: 'Hasła nie są zgodne.' });
    }

    // Tutaj dodaj logikę zapisu danych rejestracyjnych
    // np. zapis do bazy danych

    res.json({ success: true, message: 'Zarejestrowano pomyślnie!' });
});

// Nasłuchiwanie na porcie 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}...`);
});
