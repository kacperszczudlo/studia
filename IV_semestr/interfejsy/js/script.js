// script.js
// Zablokowanie alertów w przeglądarce
const originalAlert = window.alert;
window.alert = function(message) {
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

// Funkcja do pobierania danych z Wikipedii
async function fetchFishData(fishName) {
  try {
    const response = await fetch(
      `https://pl.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${encodeURIComponent(fishName)}&format=json&origin=*`
    );
    const data = await response.json();
    const page = Object.values(data.query.pages)[0];
    return page.extract ? page.extract : "Brak opisu dla tej ryby w Wikipedii.";
  } catch (error) {
    console.error(`Błąd podczas pobierania danych dla ${fishName}:`, error);
    return "Wystąpił błąd podczas ładowania opisu.";
  }
}

// Funkcje walidacyjne
function validateUsername(username) {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
}

function validatePassword(password) {
  return password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Animacja rybki i ładowanie opisów ryb
document.addEventListener('DOMContentLoaded', async () => {
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
  }

  // Logika logowania
  const loginIcon = document.getElementById('loginIcon');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.querySelector('#loginModal .close');
  const logoutModal = document.createElement('div');
  logoutModal.id = 'logoutModal';
  logoutModal.className = 'modal';
  logoutModal.innerHTML = `
    <div class="modal-content">
      <span class="close">×</span>
      <div class="modal-header">Wylogowanie</div>
      <div class="modal-body">
        <p>Czy na pewno chcesz się wylogować?</p>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" id="logout-cancel">Anuluj</button>
        <button class="logout-btn" onclick="logout()">Wyloguj</button>
      </div>
    </div>
  `;
  document.body.appendChild(logoutModal);

  const loginError = document.createElement('p');
  loginError.style.color = 'red';
  loginError.style.textAlign = 'center';
  loginError.id = 'login-error';

  if (loginIcon && loginModal && closeLoginModal) {
    loginModal.querySelector('.modal-body').appendChild(loginError);

    const openLoginModal = () => {
      loginModal.style.display = 'block';
      loginError.textContent = '';
    };

    const openLogoutModal = () => {
      logoutModal.style.display = 'block';
    };

    loginIcon.addEventListener('click', () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        openLogoutModal();
      } else {
        openLoginModal();
      }
    });

    closeLoginModal.addEventListener('click', () => {
      loginModal.style.display = 'none';
      loginError.textContent = '';
    });

    logoutModal.querySelector('.close').addEventListener('click', () => {
      logoutModal.style.display = 'none';
    });

    logoutModal.querySelector('#logout-cancel').addEventListener('click', () => {
      logoutModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
        loginError.textContent = '';
      }
      if (event.target === logoutModal) {
        logoutModal.style.display = 'none';
      }
    });

    window.signIn = function() {
      const usernameInput = document.querySelector('#loginModal .modal-body input[type="text"]');
      const passwordInput = document.querySelector('#loginModal .modal-body input[type="password"]');
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!username || !password) {
        loginError.textContent = 'Proszę wypełnić wszystkie pola.';
        return;
      }

      if (!validateUsername(username)) {
        loginError.textContent = 'Nazwa użytkownika musi mieć co najmniej 3 znaki i zawierać tylko litery, cyfry lub "_".';
        return;
      }

      if (!validatePassword(password)) {
        loginError.textContent = 'Hasło musi mieć co najmniej 6 znaków, zawierać dużą literę i cyfrę.';
        return;
      }

      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (storedUsername && storedPassword) {
        if (storedUsername === username && storedPassword === password) {
          localStorage.setItem('isLoggedIn', 'true');
          loginModal.style.display = 'none';
          loginError.textContent = '';
          updateUserInterface();
        } else {
          loginError.textContent = 'Nieprawidłowa nazwa użytkownika lub hasło.';
        }
      } else {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');
        loginModal.style.display = 'none';
        loginError.textContent = '';
        updateUserInterface();
      }
    };

    function updateUserInterface() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      console.log('Updating UI, isLoggedIn:', isLoggedIn);

      if (isLoggedIn) {
        console.log('Setting logged-in icon');
        loginIcon.src = 'images/user-logged-in.png';
        loginIcon.alt = 'Wyloguj';
        loginIcon.style.display = 'block';
      } else {
        console.log('Setting logged-out icon');
        loginIcon.src = 'images/user.png';
        loginIcon.alt = 'Login';
        loginIcon.style.display = 'block';
      }

      loginIcon.onerror = () => {
        console.error('Failed to load image:', loginIcon.src);
        loginIcon.src = 'images/user.png';
      };
    }

    window.logout = function() {
      console.log('Logging out');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      logoutModal.style.display = 'none';
      updateUserInterface();
    };

    updateUserInterface();
  }

  // Logika rejestracji
  const registerBtn = document.querySelector('#loginModal .register-btn');
  const registerModal = document.getElementById('registerModal');
  const closeRegisterModal = document.querySelector('#registerModal .close');
  const registerError = document.createElement('p');
  registerError.style.color = 'red';
  registerError.style.textAlign = 'center';
  registerError.id = 'register-error';

  if (registerBtn && registerModal && closeRegisterModal) {
    registerModal.querySelector('.modal-body').appendChild(registerError);

    // Sprawdzenie i dodanie pola "Powtórz hasło" jeśli nie istnieje
    let repeatPasswordInput = registerModal.querySelector('input[placeholder="Powtórz hasło"]');
    if (!repeatPasswordInput) {
      repeatPasswordInput = document.createElement('input');
      repeatPasswordInput.type = 'password';
      repeatPasswordInput.placeholder = 'Powtórz hasło';
      repeatPasswordInput.required = true;
      registerModal.querySelector('.modal-body').insertBefore(repeatPasswordInput, registerModal.querySelector('.modal-footer'));
    }

    registerBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
      registerModal.style.display = 'block';
      registerError.textContent = '';
    });

    closeRegisterModal.addEventListener('click', () => {
      registerModal.style.display = 'none';
      registerError.textContent = '';
    });

    const cancelRegisterBtn = registerModal.querySelector('.cancel-btn');
    if (cancelRegisterBtn) {
      cancelRegisterBtn.addEventListener('click', () => {
        registerModal.style.display = 'none';
        registerError.textContent = '';
      });
    } else {
      console.error('Cancel button not found in register modal');
    }

    window.addEventListener('click', (event) => {
      if (event.target === registerModal) {
        registerModal.style.display = 'none';
        registerError.textContent = '';
      }
    });

    window.register = function() {
      const usernameInput = document.querySelector('#registerModal .modal-body input[type="text"]');
      const emailInput = document.querySelector('#registerModal .modal-body input[type="email"]');
      const passwordInput = document.querySelector('#registerModal .modal-body input[type="password"]');
      const repeatPasswordInput = document.querySelector('#registerModal .modal-body input[placeholder="Powtórz hasło"]');
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const repeatPassword = repeatPasswordInput.value.trim();

      if (!username || !email || !password || !repeatPassword) {
        registerError.textContent = 'Proszę wypełnić wszystkie pola.';
        return;
      }

      if (!validateUsername(username)) {
        registerError.textContent = 'Nazwa użytkownika musi mieć co najmniej 3 znaki i zawierać tylko litery, cyfry lub "_".';
        return;
      }

      if (!validateEmail(email)) {
        registerError.textContent = 'Proszę podać poprawny adres email.';
        return;
      }

      if (!validatePassword(password)) {
        registerError.textContent = 'Hasło musi mieć co najmniej 6 znaków, zawierać dużą literę i cyfrę.';
        return;
      }

      if (password !== repeatPassword) {
        registerError.textContent = 'Hasła nie są zgodne.';
        return;
      }

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('isLoggedIn', 'true');
      registerModal.style.display = 'none';
      registerError.textContent = '';
      updateUserInterface();
    };
  }

  // Obsługa przewijania do sekcji
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

  // Dynamiczne ładowanie opisów ryb z Wikipedii
  const fishImages = document.querySelectorAll('.fish-image');
  const fishInfoModal = document.getElementById('fishInfoModal');
  const fishInfoModalHeader = document.getElementById('fishInfoModalHeader');
  const fishInfoModalBody = document.getElementById('fishInfoModalBody');
  const closeFishInfoModal = fishInfoModal?.querySelector('.close');

  if (fishImages.length > 0 && fishInfoModal && closeFishInfoModal) {
    for (let image of fishImages) {
      const fishName = image.getAttribute('data-fish-name');
      image.addEventListener('click', async () => {
        const description = await fetchFishData(fishName);
        fishInfoModalHeader.textContent = fishName;
        fishInfoModalBody.innerHTML = description;
        fishInfoModal.style.display = 'block';
      });
    }

    closeFishInfoModal.addEventListener('click', () => {
      fishInfoModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === fishInfoModal) {
        fishInfoModal.style.display = 'none';
      }
    });
  }
});