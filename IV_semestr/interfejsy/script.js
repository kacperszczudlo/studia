// Zablokowanie alertów w przeglądarce
const originalAlert = window.alert;
window.alert = function(message) {
  // Pusta funkcja – blokuje wyświetlanie alertów
  return null;
};

// Obsługa menu hamburgera
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Aktywacja linku na podstawie aktualnej strony
const currentPage = window.location.pathname.split('/').pop();
const links = document.querySelectorAll('.nav-links li a');

if (links.length > 0) {
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Animacja rybki podążającej za kursorem
document.addEventListener('DOMContentLoaded', function() {
  const fish = document.getElementById('fish');
  const navbar = document.querySelector('.navbar');

  if (fish && navbar) { // Sprawdzenie, czy elementy istnieją
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let fishX = mouseX;
    let fishY = mouseY;
    let isFlipped = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    function animateFish() {
      const fishWidth = fish.offsetWidth;
      const fishHeight = fish.offsetHeight;
      const navbarHeight = navbar.offsetHeight;
      const footer = document.querySelector('.footer');
      const footerHeight = footer ? footer.offsetHeight : 0;
      const footerTop = footer ? footer.offsetTop : window.innerHeight;

      fishX += (mouseX - fishX) * 0.1;
      fishY += (mouseY - fishY) * 0.1;

      fishX = Math.max(0, Math.min(fishX, window.innerWidth - fishWidth));
      fishY = Math.max(navbarHeight + 20, Math.min(fishY, footerTop - fishHeight));

      fish.style.left = `${fishX}px`;
      fish.style.top = `${fishY}px`;

      // Flip the fish horizontally when it crosses the center of the screen
      if (mouseX > window.innerWidth / 2 && !isFlipped) {
        fish.style.transform = 'scaleX(-1)';
        isFlipped = true;
      } else if (mouseX <= window.innerWidth / 2 && isFlipped) {
        fish.style.transform = 'scaleX(1)';
        isFlipped = false;
      }

      requestAnimationFrame(animateFish);
    }

    // Ustaw początkową pozycję rybki i uruchom animację
    fish.style.left = `${window.innerWidth / 2}px`;
    fish.style.top = `${window.innerHeight / 2}px`;
    animateFish();
  }

  // Logika logowania
  const loginIcon = document.getElementById('loginIcon');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.querySelector('#loginModal .close');
  const cancelLoginBtn = document.querySelector('#loginModal .cancel-btn');
  const forgotPassword = document.querySelector('#loginModal .forgot-password a');

  if (loginIcon && loginModal && closeLoginModal && cancelLoginBtn && forgotPassword) {
    loginIcon.addEventListener('click', () => {
      loginModal.style.display = 'block';
    });

    closeLoginModal.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });

    cancelLoginBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });

    forgotPassword.addEventListener('click', () => {
      // Zablokowane przez window.alert – brak alertu
    });

    window.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });

    function signIn() {
      const username = document.querySelector('#loginModal .modal-body input[type="text"]').value;
      const password = document.querySelector('#loginModal .modal-body input[type="password"]').value;

      if (username && password) {
        loginModal.style.display = 'none'; // Brak alertu
      } else {
        // Brak alertu o błędzie
      }
    }
  }

  // Logika rejestracji
  const registerBtn = document.querySelector('.register-btn');
  const registerModal = document.getElementById('registerModal');
  const closeRegisterModal = document.querySelector('#registerModal .close');
  const cancelRegisterBtn = document.querySelector('#registerModal .cancel-btn');

  if (registerBtn && registerModal && closeRegisterModal && cancelRegisterBtn) {
    registerBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
      registerModal.style.display = 'block';
    });

    closeRegisterModal.addEventListener('click', () => {
      registerModal.style.display = 'none';
    });

    cancelRegisterBtn.addEventListener('click', () => {
      registerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === registerModal) {
        registerModal.style.display = 'none';
      }
    });

    function register() {
      const username = document.querySelector('#registerModal .modal-body input[type="text"]').value;
      const email = document.querySelector('#registerModal .modal-body input[type="email"]').value;
      const password = document.querySelector('#registerModal .modal-body input[type="password"]').value;

      if (username && email && password) {
        registerModal.style.display = 'none'; // Brak alertu
      } else {
        // Brak alertu o błędzie
      }
    }
  }

  // Obsługa przewijania do sekcji z uwzględnieniem wysokości navbaru
  const shopMenuLinks = document.querySelectorAll('.shop-menu ul li a');
  if (shopMenuLinks.length > 0) {
    shopMenuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Pobierz ID bez #
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight; // Odejmij wysokość navbaru
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth' // Dodaje płynne przewijanie
          });
        }
      });
    });
  }

  // Logika koszyka (modyfikacja dodawania i usuwania produktów)
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }

  function toggleCart(productId, productName, productPrice, button) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      // Usuń produkt z koszyka (przycisk niebieski "Dodano do koszyka" usuwa)
      cart = cart.filter(item => item.id !== productId);
      // Przywróć pierwotny stan przycisku (zielony "Dodaj do koszyka")
      button.style.backgroundColor = '#28a745'; // Zielony, stan "Dodaj do koszyka"
      button.style.color = '#fff'; // Biały tekst
      button.textContent = 'Dodaj do koszyka';
    } else {
      // Dodaj produkt do koszyka (przycisk zielony "Dodaj do koszyka" dodaje)
      cart.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
      });
      // Zmień kolor i nazwę przycisku (niebieski "Dodano do koszyka")
      button.style.backgroundColor = '#6ab0ff'; // Jasnoniebieski, stan "Dodano do koszyka"
      button.style.color = '#fff'; // Biały tekst dla lepszej widoczności
      button.textContent = 'Dodano do koszyka';
    }

    saveCart();
  }

  // Inicjalizacja licznika koszyka
  updateCartCount();

  // Obsługa kliknięcia przycisków "Dodaj do koszyka"
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = button.getAttribute('data-product-id');
        const productName = button.parentNode.querySelector('.product-name').textContent.trim();
        const productPrice = button.parentNode.querySelector('.product-price').textContent.trim().replace('Cena: ', '');

        toggleCart(productId, productName, productPrice, button);
      });
    });
  }
});

// Ensure no conflicts with cart.js
// ...existing code...