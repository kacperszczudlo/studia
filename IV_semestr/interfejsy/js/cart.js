// cart.js
document.addEventListener('DOMContentLoaded', function() {
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsElement = document.getElementById('cartItems');
  const cartSummaryContainer = document.querySelector('.cart-summary');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartModal = document.getElementById('cartModal');
  const closeBtn = cartModal?.querySelector('.close');
  const cartBtn = document.getElementById('cartBtn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartSummary();
    updateCartButtons();
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems > 0 ? totalItems : '0';
    }
  }

  function updateCartSummary() {
    if (!cartSummaryContainer) return;

    const totalAmount = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    cartSummaryContainer.innerHTML = `
      <p>Łączna kwota do zapłaty:</p>
      <p class="total-amount">${totalAmount.toFixed(2)} PLN</p>
    `;
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
  }

  function renderCartItems() {
    if (!cartItemsElement) return;

    cartItemsElement.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.padding = '10px';
      li.innerHTML = `
        <span>${item.name} - ${item.price.toFixed(2)} PLN (x${item.quantity || 1})</span>
        <button class="remove-item" data-product-id="${item.id}">
          <img src="images/trash.png" alt="Usuń" class="trash-icon"> Usuń
        </button>
      `;
      cartItemsElement.appendChild(li);

      const removeButton = li.querySelector('.remove-item');
      removeButton.addEventListener('click', () => {
        removeFromCart(item.id);
      });
    });

    if (cart.length === 0) {
      cartItemsElement.innerHTML = '<li>Twój koszyk jest pusty.</li>';
    }
  }

  function updateCartButtons() {
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
      const productId = button.getAttribute('data-product-id');
      const inCart = cart.some(item => item.id === productId);
      button.textContent = inCart ? 'Dodano do koszyka' : 'Dodaj do koszyka';
      button.style.backgroundColor = inCart ? '#6ab0ff' : '#007BFF'; // Jasnoniebieski dla "Dodano", niebieski dla "Dodaj"
    });
  }

  window.toggleCart = function(productId, productName, productPrice, button) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    if (existingItemIndex === -1) {
      // Dodaj do koszyka
      cart.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
      button.textContent = 'Dodano do koszyka';
      button.style.backgroundColor = '#6ab0ff';
    }
    saveCart();
  };

  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderCartItems();
      cartModal.style.display = 'block';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      cart = [];
      saveCart();
      renderCartItems();
      cartModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  updateCartCount();
  updateCartSummary();
  updateCartButtons();
});