document.addEventListener('DOMContentLoaded', function() {
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsElement = document.getElementById('cartItems');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartModal = document.getElementById('cartModal');
  const closeBtn = cartModal.querySelector('.close');
  const cartBtn = document.getElementById('cartBtn');

  let cart = [];

  function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice)
      });
    }

    updateCartCount();
  }

  function updateCartCount() {
    cartCountElement.textContent = cart.length;
  }

  function renderCartItems() {
    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price} PLN`;
      cartItemsElement.appendChild(li);
    });

    if (cart.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Twój koszyk jest pusty.';
      cartItemsElement.appendChild(li);
    }

    cartModal.style.display = 'block';
  }

  closeBtn.addEventListener('click', function() {
    cartModal.style.display = 'none';
  });

  checkoutBtn.addEventListener('click', function() {
    alert('Przekierowanie do strony płatności...');
    cart = [];
    updateCartCount();
    renderCartItems();
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
});
