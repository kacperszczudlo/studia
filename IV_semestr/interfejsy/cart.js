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
  }

  function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
      });
    }

    updateCartCount();
    saveCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
    saveCart();
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }

  function renderCartItems() {
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

    cartModal.style.display = 'block';

    const removeItemButtons = document.querySelectorAll('.remove-item');
    removeItemButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const productId = button.getAttribute('data-product-id');
        removeFromCart(productId);
      });
    });
  }

  closeBtn.addEventListener('click', function() {
    cartModal.style.display = 'none';
  });

  checkoutBtn.addEventListener('click', function() {
    alert('Przekierowanie do strony płatności...');
    cart = [];
    updateCartCount();
    renderCartItems();
    saveCart();
    cartModal.style.display = 'none';
  });

  cartBtn.addEventListener('click', function(event) {
    event.preventDefault();
    renderCartItems();
    cartModal.style.display = 'block';
  });

  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      const productId = button.getAttribute('data-product-id');
      const productName = button.parentNode.querySelector('.product-name').textContent.trim();
      const productPrice = button.parentNode.querySelector('.product-price').textContent.trim().replace('Cena: ', '');
      
      addToCart(productId, productName, productPrice);
    });
  });

  updateCartCount();
});
