// Funkcja do pobierania produktów z lokalnego pliku JSON
async function fetchProducts() {
  try {
    const response = await fetch('/json/products.json');
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
    { id: 'odziez-grid', name: 'Odzież wędkarska' },
    { id: 'siatki-grid', name: 'Siatki na ryby' },
  ];

  categories.forEach(category => {
    const grid = document.getElementById(category.id);
    if (!grid) {
      console.error(`Nie znaleziono elementu o ID: ${category.id}`);
      return;
    }

    grid.innerHTML = ''; // Clear the grid before appending new products

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

      // Add event listener for the "Dodaj do koszyka" button
      const addToCartButton = productItem.querySelector('.add-to-cart-button');
      addToCartButton.addEventListener('click', () => {
        const productId = product.id;
        const productName = product.title;
        const productPrice = product.price;

        // Call the global toggleCart function
        window.toggleCart(productId, productName, productPrice, addToCartButton);
      });

      // Update button state if the product is already in the cart
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        addToCartButton.style.backgroundColor = '#6ab0ff';
        addToCartButton.style.color = '#fff';
        addToCartButton.textContent = 'Dodano do koszyka';
      }
    });
  });

  if (loader) {
    loader.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', displayProducts);