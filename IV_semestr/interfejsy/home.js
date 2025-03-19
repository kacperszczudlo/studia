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
  
  // Funkcja do wyświetlania po jednym produkcie z każdej kategorii
  async function displayFeaturedProducts() {
    const products = await fetchProducts();
    if (products.length === 0) {
      console.error('Brak produktów do wyświetlenia');
      return;
    }
  
    const categories = [
      'Wędki',
      'Przynęty',
      'Żyłki',
      'Siedzenia',
      'Podbieraki',
      'Kołowrotki',
      'Haczyki',
      'Spławiki',
      'Odzież wędkarska',
      'Siatki na ryby'
    ];
  
    const track = document.getElementById('scroll-track');
    if (!track) {
      console.error('Nie znaleziono elementu o ID: scroll-track');
      return;
    }
  
    const container = document.querySelector('.scroll-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
  
    // Wybierz po jednym produkcie z każdej kategorii
    const selectedProducts = [];
    categories.forEach(category => {
      const product = products.find(product => product.category === category);
      if (product) {
        selectedProducts.push(product);
      }
    });
  
    // Wypełnij pasek produktami
    selectedProducts.forEach(product => {
      const scrollItem = document.createElement('div');
      scrollItem.classList.add('scroll-item');
  
      // Jeśli obraz nie istnieje, ustaw domyślny placeholder
      const imageSrc = product.image && product.image !== "" ? product.image : "https://via.placeholder.com/300x200?text=Brak+zdjęcia";
  
      scrollItem.innerHTML = `
        <img src="${imageSrc}" alt="${product.title}">
        <p class="product-name">${product.title}</p>
        <p class="product-price">Cena: ${product.price.toFixed(2)} PLN</p>
        <button type="button" class="add-to-cart-button" data-product-id="${product.id}">Dodaj do koszyka</button>
      `;
  
      track.appendChild(scrollItem);
  
      const button = scrollItem.querySelector('.add-to-cart-button');
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
  
    // Obsługa przewijania z uwzględnieniem responsywności
    let currentIndex = 0;
    const itemWidth = 320; // Szerokość produktu (300px + 20px margin-right)
    const totalItems = selectedProducts.length;
  
    // Funkcja do obliczania liczby widocznych produktów na podstawie szerokości ekranu
    function getVisibleItems() {
      const containerWidth = container.clientWidth;
      if (containerWidth >= 960) return 3; // 3 produkty
      if (containerWidth >= 640) return 2; // 2 produkty
      return 1; // 1 produkt
    }
  
    function updateScroll() {
      const visibleItems = getVisibleItems();
      const maxIndex = totalItems - visibleItems; // Maksymalny indeks przewijania
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
  
      const offset = currentIndex * itemWidth;
      track.style.transform = `translateX(-${offset}px)`;
  
      // Ukrywanie strzałek
      if (currentIndex <= 0) {
        scrollLeftBtn.classList.add('hidden');
      } else {
        scrollLeftBtn.classList.remove('hidden');
      }
  
      if (currentIndex >= maxIndex) {
        scrollRightBtn.classList.add('hidden');
      } else {
        scrollRightBtn.classList.remove('hidden');
      }
    }
  
    scrollLeftBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateScroll();
      }
    });
  
    scrollRightBtn.addEventListener('click', () => {
      const visibleItems = getVisibleItems();
      const maxIndex = totalItems - visibleItems;
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateScroll();
      }
    });
  
    // Aktualizacja przy zmianie rozmiaru okna
    window.addEventListener('resize', updateScroll);
  
    // Początkowa aktualizacja
    updateScroll();
  }
  
  document.addEventListener('DOMContentLoaded', displayFeaturedProducts);