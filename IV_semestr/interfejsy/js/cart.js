document.addEventListener('DOMContentLoaded', function() {
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsElement = document.getElementById('cartItems');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartModal = document.getElementById('cartModal');
  const closeBtn = cartModal.querySelector('.close');
  const cartBtn = document.getElementById('cartBtn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
    saveCart();
    // Update the button state in script.js
    const button = document.querySelector(`.add-to-cart-button[data-product-id="${productId}"]`);
    if (button) {
      button.style.backgroundColor = '#007BFF';
      button.style.color = '#fff';
      button.textContent = 'Dodaj do koszyka';
    }
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems >= 0 ? totalItems : '0';
    }
  }

  function renderCartItems() {
    if (!cartItemsElement) return;

    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - ${item.price} PLN (x${item.quantity}) <button class="remove-item" data-product-id="${item.id}"><img src="images/trash.png" alt="Usuń" class="trash-icon"></button>`;
      cartItemsElement.appendChild(li);
    });

    if (cart.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Twój koszyk jest pusty.';
      cartItemsElement.appendChild(li);
    }

    // Re-attach event listeners for remove buttons
    const removeItemButtons = document.querySelectorAll('.remove-item');
    removeItemButtons.forEach(button => {
      button.removeEventListener('click', button._removeHandler);
      button._removeHandler = function(event) {
        event.preventDefault();
        const productId = button.getAttribute('data-product-id');
        removeFromCart(productId);
      };
      button.addEventListener('click', button._removeHandler);
    });
  }

  // Expose a function to update the cart modal when called by script.js
  window.updateCartModal = function() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartModal.style.display === 'block') {
      renderCartItems();
    }
    updateCartCount();
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      cartModal.style.display = 'none';
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      cart = [];
      saveCart();
      renderCartItems();
      cartModal.style.display = 'none';
      // Reset all add-to-cart buttons
      document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#fff';
        button.textContent = 'Dodaj do koszyka';
      });
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', function(event) {
      event.preventDefault();
      cart = JSON.parse(localStorage.getItem('cart')) || [];
      renderCartItems();
      cartModal.style.display = 'block';
    });
  }

  // Initialize the cart count on page load
  updateCartCount();
});