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
  const forgotPassword = document.querySelector('#loginModal .forgot-password a');

  if (loginIcon && loginModal && closeLoginModal && forgotPassword) {
    loginIcon.addEventListener('click', () => {
      loginModal.style.display = 'block';
    });

    closeLoginModal.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });

    window.signIn = function() {
      const username = document.querySelector('#loginModal .modal-body input[type="text"]').value;
      const password = document.querySelector('#loginModal .modal-body input[type="password"]').value;

      if (username && password) {
        // Prosta walidacja - w prawdziwej aplikacji byłaby tu komunikacja z backendem
        if (username.length >= 3 && password.length >= 6) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username);
          loginModal.style.display = 'none';
          updateUserInterface();
        } else {
          console.log('Nazwa użytkownika musi mieć co najmniej 3 znaki, a hasło 6 znaków.');
        }
      } else {
        console.log('Proszę wypełnić wszystkie pola.');
      }
    };

    function updateUserInterface() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        loginIcon.src = 'images/user-logged-in.png'; // Zakładamy, że masz inną ikonę dla zalogowanego użytkownika
        loginIcon.alt = 'Wyloguj';
        loginIcon.removeEventListener('click', openLoginModal);
        loginIcon.addEventListener('click', logout);
      }
    }

    function logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      loginIcon.src = 'images/user.png';
      loginIcon.alt = 'Login';
      loginIcon.removeEventListener('click', logout);
      loginIcon.addEventListener('click', () => {
        loginModal.style.display = 'block';
      });
    }

    // Inicjalizacja interfejsu użytkownika przy ładowaniu strony
    updateUserInterface();
  }

  // Logika rejestracji
  const registerBtn = document.querySelector('#loginModal .register-btn');
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

    window.register = function() {
      const username = document.querySelector('#registerModal .modal-body input[type="text"]').value;
      const email = document.querySelector('#registerModal .modal-body input[type="email"]').value;
      const password = document.querySelector('#registerModal .modal-body input[type="password"]').value;

      if (username && email && password) {
        // Prosta walidacja - w prawdziwej aplikacji byłaby tu komunikacja z backendem
        if (username.length >= 3 && email.includes('@') && password.length >= 6) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username);
          registerModal.style.display = 'none';
          updateUserInterface();
        } else {
          console.log('Proszę wypełnić poprawnie wszystkie pola.');
        }
      } else {
        console.log('Proszę wypełnić wszystkie pola.');
      }
    };
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
    // Notify cart.js to update the cart modal if it's open
    if (typeof window.updateCartModal === 'function') {
      window.updateCartModal();
    }
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems >= 0 ? totalItems : '0';
    }
  }

  function toggleCart(productId, productName, productPrice, button) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (button.textContent === 'Dodano do koszyka') {
      // Produkt powinien zostać usunięty z koszyka
      if (existingItemIndex !== -1) {
        cart.splice(existingItemIndex, 1);
        button.style.backgroundColor = '#007BFF'; // Niebieski, stan "Dodaj do koszyka"
        button.style.color = '#fff';
        button.textContent = 'Dodaj do koszyka';
      } else {
        // If the product isn't in the cart but the button says "Dodano do koszyka", reset the button
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#fff';
        button.textContent = 'Dodaj do koszyka';
      }
    } else if (button.textContent === 'Dodaj do koszyka') {
      // Produkt powinien zostać dodany do koszyka
      if (existingItemIndex === -1) {
        cart.push({
          id: productId,
          name: productName,
          price: parseFloat(productPrice),
          quantity: 1
        });
        button.style.backgroundColor = '#6ab0ff'; // Jasnoniebieski, stan "Dodano do koszyka"
        button.style.color = '#fff';
        button.textContent = 'Dodano do koszyka';
      } else {
        // If the product is already in the cart but the button says "Dodaj do koszyka", update the button
        button.style.backgroundColor = '#6ab0ff';
        button.style.color = '#fff';
        button.textContent = 'Dodano do koszyka';
      }
    }

    saveCart();
  }

  // Inicjalizacja licznika koszyka
  updateCartCount();

  // Obsługa kliknięcia przycisków "Dodaj do koszyka"
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      // Sprawdź, czy produkt jest już w koszyku i ustaw odpowiedni stan przycisku
      const productId = button.getAttribute('data-product-id');
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        button.style.backgroundColor = '#6ab0ff'; // Jasnoniebieski, stan "Dodano do koszyka"
        button.style.color = '#fff';
        button.textContent = 'Dodano do koszyka';
      } else {
        button.style.backgroundColor = '#007BFF'; // Niebieski, stan "Dodaj do koszyka"
        button.style.color = '#fff';
        button.textContent = 'Dodaj do koszyka';
      }

      // Usuń istniejące event listenery, aby uniknąć duplikatów
      button.removeEventListener('click', button._clickHandler);
      button._clickHandler = function(e) {
        e.preventDefault();
        const productId = button.getAttribute('data-product-id');
        const productName = button.parentNode.querySelector('.product-name').textContent.trim();
        const productPriceText = button.parentNode.querySelector('.product-price').textContent.trim();
        const productPrice = productPriceText.replace('Cena: ', '').replace(' PLN', '');

        toggleCart(productId, productName, productPrice, button);
      };
      button.addEventListener('click', button._clickHandler);
    });
  }

  // Logika karuzeli produktów
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (carouselTrack && prevBtn && nextBtn) {
    const items = carouselTrack.querySelectorAll('.product-item');
    const itemWidth = items[0].offsetWidth; // Szerokość jednego elementu (wraz z paddingiem)
    let currentPosition = 0;
    const totalItems = items.length;
    const itemsPerView = 3; // Liczba elementów widocznych na raz
    const maxPosition = totalItems - itemsPerView; // Maksymalna pozycja przewijania

    function updateButtonVisibility() {
      // Ukryj strzałkę w lewo, jeśli jesteśmy na początku
      if (currentPosition === 0) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }

      // Ukryj strzałkę w prawo, jeśli jesteśmy na końcu
      if (currentPosition >= maxPosition) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
      }
    }

    prevBtn.addEventListener('click', () => {
      if (currentPosition > 0) {
        currentPosition--;
        carouselTrack.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        updateButtonVisibility();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentPosition < maxPosition) {
        currentPosition++;
        carouselTrack.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        updateButtonVisibility();
      }
    });

    // Początkowa widoczność przycisków
    updateButtonVisibility();

    // Aktualizuj widoczność przycisków przy zmianie rozmiaru okna
    window.addEventListener('resize', () => {
      const newItemWidth = items[0].offsetWidth;
      carouselTrack.style.transform = `translateX(-${currentPosition * newItemWidth}px)`;
      updateButtonVisibility();
    });
  }
});