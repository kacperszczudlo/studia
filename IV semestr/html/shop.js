// shop.js
async function fetchProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) throw new Error('Błąd podczas pobierania produktów');
    return await response.json();
  } catch (error) {
    console.error('Wystąpił błąd:', error);
    return [];
  }
}

async function displayProducts() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'block';

  const products = await fetchProducts();
  if (products.length === 0) {
    console.error('Brak produktów do wyświetlenia');
    if (loader) loader.style.display = 'none';
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
    { id: 'odziez-grid', name: 'Odzież wędkarska' },
    { id: 'siatki-grid', name: 'Siatki na ryby' }
  ];

  categories.forEach(category => {
    const grid = document.getElementById(category.id);
    if (!grid) {
      console.error(`Nie znaleziono elementu o ID: ${category.id}`);
      return;
    }

    grid.innerHTML = '';

    const categoryProducts = products.filter(product => product.category === category.name);

    categoryProducts.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/300x200?text=Brak+zdjęcia'}" alt="${product.title}">
        <p class="product-name">${product.title}</p>
        <p class="product-price">Cena: ${product.price.toFixed(2)} PLN</p>
        <button class="add-to-cart-button" data-product-id="${product.id}">Dodaj do koszyka</button>
      `;
      grid.appendChild(productItem);

      const button = productItem.querySelector('.add-to-cart-button');
      button.addEventListener('click', () => {
        window.toggleCart(product.id, product.title, product.price, button);
      });
    });

    window.updateCartButtons(); // Synchronizuj przyciski
  });

  if (loader) loader.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', displayProducts);