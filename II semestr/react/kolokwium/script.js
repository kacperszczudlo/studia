function zmienKolor() {
    document.querySelector('.box').style.backgroundColor = 'red';
    document.body.style.backgroundColor = 'grey';
}

function odliczanieCzasu(licznik) {
    let box = document.querySelector('.box');
    box.innerHTML = licznik;
    if (licznik > 0) {
        setTimeout(function () {
            odliczanieCzasu(licznik - 1);
        }, 1000);
    } else {
        box.innerHTML = "";
    }
}

function wyslij() {
    let email = document.querySelector('#email').value;
    let subject = document.querySelector('#subject').value;
    let message = document.querySelector('#message').value;

    let newData = document.createElement('div');
    newData.textContent = `Email: ${email}, Temat: ${subject}, Wiadomość: ${message}`;

    let displayData = document.getElementById('displayData');
    displayData.innerHTML = `<div>Email: ${email}, Temat: ${subject}, Wiadomość: ${message}</div>`;

    document.querySelector('form').reset();
}


function wyczysc() {
    document.querySelector('form').reset();
    let displayData = document.getElementById('displayData');
    displayData.innerHTML = '';
}

