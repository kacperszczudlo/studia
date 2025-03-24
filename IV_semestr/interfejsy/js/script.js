// Zablokowanie alertów w przeglądarce
const originalAlert = window.alert;
window.alert = function(message) {
  // Pusta funkcja – blokuje wyświetlanie alertów
  return null;
};

// Globalne zmienne i funkcje dla koszyka
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.getElementById('cart-count');

window.saveCart = function() {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.updateCartCount();
  if (typeof window.updateCartModal === 'function') {
    window.updateCartModal();
  }
};

window.updateCartCount = function() {
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  if (cartCountElement) {
    cartCountElement.textContent = totalItems >= 0 ? totalItems : '0';
  }
};

window.toggleCart = function(productId, productName, productPrice, button) {
  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (button.textContent === 'Dodano do koszyka') {
    if (existingItemIndex !== -1) {
      cart.splice(existingItemIndex, 1);
      button.style.backgroundColor = '#007BFF';
      button.style.color = '#fff';
      button.textContent = 'Dodaj do koszyka';
    }
  } else if (button.textContent === 'Dodaj do koszyka') {
    if (existingItemIndex === -1) {
      cart.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
      });
      button.style.backgroundColor = '#6ab0ff';
      button.style.color = '#fff';
      button.textContent = 'Dodano do koszyka';
    }
  }

  window.saveCart();
};

// Inicjalizacja licznika koszyka
window.updateCartCount();

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

  if (fish && navbar) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let fishX = mouseX;
    let fishY = mouseY;
    let isFlipped = false;

    fish.style.transformOrigin = 'center center';
    fish.style.position = 'absolute';

    document.addEventListener('mousemove', (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    function animateFish() {
      const fishWidth = fish.offsetWidth || 50;
      const fishHeight = fish.offsetHeight || 30;
      const navbarHeight = navbar.offsetHeight || 0;
      const footer = document.querySelector('.footer');
      const footerHeight = footer ? footer.offsetHeight : 0;
      const footerTop = footer ? footer.offsetTop : window.innerHeight;

      fishX += (mouseX - fishX) * 0.1;
      fishY += (mouseY - fishY) * 0.1;

      fishX = Math.max(0, Math.min(fishX, window.innerWidth - fishWidth));
      fishY = Math.max(navbarHeight + 20, Math.min(fishY, footerTop - fishHeight));

      const deltaX = mouseX - fishX;
      const threshold = 5;
      if (deltaX > threshold) {
        isFlipped = true;
      } else if (deltaX < -threshold) {
        isFlipped = false;
      }

      fish.style.left = `${fishX}px`;
      fish.style.top = `${fishY}px`;
      fish.style.transform = `scaleX(${isFlipped ? -1 : 1})`;

      requestAnimationFrame(animateFish);
    }

    fish.style.left = `${window.innerWidth / 2}px`;
    fish.style.top = `${window.innerHeight / 2}px`;
    animateFish();
  } else {
    console.error('Fish or navbar element not found:', { fish, navbar });
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
        loginIcon.src = 'images/user-logged-in.png';
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
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
});