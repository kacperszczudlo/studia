document.addEventListener('DOMContentLoaded', function() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = cartModal.querySelector('.close');
    const cartBtn = document.getElementById('cartBtn'); // Przycisk koszyka w nawigacji

    let cart = []; // Inicjalizacja pustego koszyka

    // Funkcja do dodawania produktu do koszyka
    function addToCart(productId, productName, productPrice) {
        // Sprawdzenie, czy produkt jest już w koszyku
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            // Jeśli produkt jest już w koszyku, usuwamy go
            cart = cart.filter(item => item.id !== productId);
        } else {
            // Jeśli produkt nie jest w koszyku, dodajemy go
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice)
            });
        }

        // Aktualizacja licznika koszyka
        updateCartCount();
    }

    // Funkcja do aktualizacji licznika koszyka
    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    // Funkcja do renderowania elementów koszyka
    function renderCartItems() {
        // Wyczyszczenie istniejących elementów w koszyku
        cartItemsElement.innerHTML = '';

        // Iteracja przez elementy koszyka i dodanie ich do listy
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} PLN`;
            cartItemsElement.appendChild(li);
        });

        // Jeśli koszyk jest pusty, wyświetl komunikat
        if (cart.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Twój koszyk jest pusty.';
            cartItemsElement.appendChild(li);
        }

        // Pokaż modal koszyka
        cartModal.style.display = 'block';
    }

    // Obsługa zamknięcia modala koszyka
    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Obsługa kliknięcia przycisku "Do kasy"
    checkoutBtn.addEventListener('click', function() {
        // Tutaj można dodać logikę obsługi procesu zakupowego, np. przekierowanie do strony płatności
        alert('Przekierowanie do strony płatności...');
        // Na potrzeby demonstracji, resetujemy koszyk po "zakupie"
        cart = [];
        updateCartCount();
        renderCartItems();
        cartModal.style.display = 'none';
    });

    // Obsługa kliknięcia przycisku koszyka w nawigacji
    cartBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Zapobiegaj domyślnej akcji linku
        renderCartItems();
        cartModal.style.display = 'block';
    });

    // Nasłuchiwanie kliknięcia przycisków "Dodaj do koszyka"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Zapobiegaj domyślnej akcji przycisku

            const productId = button.getAttribute('data-product-id');
            const productName = button.parentNode.querySelector('.product-name').textContent.trim();
            const productPrice = button.parentNode.querySelector('.product-price').textContent.trim().replace('Cena: ', '');

            addToCart(productId, productName, productPrice);
            // renderCartItems(); // Usunięte wywołanie renderCartItems() po każdym kliknięciu "Dodaj do koszyka"
        });
    });
});
