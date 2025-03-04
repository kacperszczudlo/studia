const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

const currentPage = window.location.pathname.split('/').pop();
const links = document.querySelectorAll('.nav-links li a');

links.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

const fish = document.getElementById('fish');
const navbar = document.querySelector('.navbar');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let fishX = mouseX;
let fishY = mouseY;

document.addEventListener('mousemove', (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

function animateFish() {
  const fishWidth = fish.offsetWidth;
  const fishHeight = fish.offsetHeight;
  const navbarHeight = navbar.offsetHeight;
  const footerHeight = document.querySelector('.footer').offsetHeight;
  const footerTop = document.querySelector('.footer').offsetTop;

  fishX += (mouseX - fishX) * 0.1;
  fishY += (mouseY - fishY) * 0.1;

  fishX = Math.max(0, Math.min(fishX, window.innerWidth - fishWidth));
  fishY = Math.max(navbarHeight, Math.min(fishY, footerTop - fishHeight));

  fish.style.left = `${fishX}px`;
  fish.style.top = `${fishY}px`;

  requestAnimationFrame(animateFish);
}

animateFish();

const loginIcon = document.querySelector('.icons img[alt="Login"]');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const cancelBtn = document.querySelector('.cancel-btn');
const forgotPassword = document.querySelector('.forgot-password');

loginIcon.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

forgotPassword.addEventListener('click', () => {
  alert('Instrukcje dotyczące resetowania hasła zostały wysłane na Twój adres e-mail.');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function signIn() {
  const username = document.querySelector('.modal-body input[type="text"]').value;
  const password = document.querySelector('.modal-body input[type="password"]').value;

  if (username && password) {
    alert(`Zalogowano jako ${username}`);
    modal.style.display = 'none';
  } else {
    alert('Proszę wypełnić wszystkie pola.');
  }
}

const registerBtn = document.querySelector('.register-btn');
const registerModal = document.getElementById('registerModal');
const closeRegisterModal = document.querySelector('#registerModal .close');
const cancelRegisterBtn = document.querySelector('#registerModal .cancel-btn');

registerBtn.addEventListener('click', () => {
  modal.style.display = 'none';
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
    alert(`Zarejestrowano jako ${username}`);
    registerModal.style.display = 'none';
  } else {
    alert('Proszę wypełnić wszystkie pola.');
  }
}