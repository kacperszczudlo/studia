// Funkcja do pobierania produktów z lokalnego pliku JSON
async function fetchProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error('Błąd podczas pobierania produktów');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Wystąpił błąd:', error);
    return [];
  }
}

// Funkcja do przypisania produktów do kategorii i wyświetlenia ich
async function displayProducts() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'block';
  }

  const products = await fetchProducts();
  if (products.length === 0) {
    console.error('Brak produktów do wyświetlenia');
    if (loader) {
      loader.style.display = 'none';
    }
    return;
  }

  const categories = [
    { id: 'wedki-grid', name: 'Wędki' },
    { id: 'przynety-grid', name: 'Przynęty' },
    { id: 'zylki-grid', name: 'Żyłki' },
    { id: 'siedzenia-grid', name: 'Siedzenia' },
    { id: 'podbieraki-grid', name: 'Podbieraki' },
    { id: 'kolowrotki-grid', name: 'Kołowrotki' },
    { id: 'haczyki-grid', name: 'Haczyki' },
    { id: 'splawiki-grid', name: 'Spławiki' },
    { id: 'ciezarki-grid', name: 'Ciężarki' },
    { id: 'odziez-grid', name: 'Odzież wędkarska' },
    { id: 'siatki-grid', name: 'Siatki na ryby' },
  ];

  categories.forEach(category => {
    const grid = document.getElementById(category.id);
    if (!grid) {
      console.error(`Nie znaleziono elementu o ID: ${category.id}`);
      return;
    }

    // Filtruj produkty dla danej kategorii
    const categoryProducts = products
      .filter(product => product.category === category.name)
      .slice(0, 3);

    categoryProducts.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');

      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <p class="product-name">${product.title}</p>
        <p class="product-price">Cena: ${product.price.toFixed(2)} PLN</p>
        <button type="button" class="add-to-cart-button" data-product-id="${product.id}">Dodaj do koszyka</button>
      `;

      grid.appendChild(productItem);
    });

    const addToCartButtons = grid.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
      const productId = button.getAttribute('data-product-id');
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        button.style.backgroundColor = '#6ab0ff';
        button.style.color = '#fff';
        button.textContent = 'Dodano do koszyka';
      } else {
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#fff';
        button.textContent = 'Dodaj do koszyka';
      }

      button.removeEventListener('click', button._clickHandler);
      button._clickHandler = function(e) {
        e.preventDefault();
        const productId = button.getAttribute('data-product-id');
        const productName = button.parentNode.querySelector('.product-name').textContent.trim();
        const productPriceText = button.parentNode.querySelector('.product-price').textContent.trim();
        const productPrice = productPriceText.replace('Cena: ', '').replace(' PLN', '');

        if (typeof window.toggleCart === 'function') {
          window.toggleCart(productId, productName, productPrice, button);
        } else {
          console.error('Funkcja toggleCart nie jest zdefiniowana.');
        }
      };
      button.addEventListener('click', button._clickHandler);
    });
  });

  if (loader) {
    loader.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', displayProducts);