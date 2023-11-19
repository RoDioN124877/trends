const buy_card = document.querySelectorAll('.buy_card');
const price = document.querySelectorAll('.price');
const title = document.querySelectorAll('.title');
const logo_card = document.querySelectorAll('.logo_card');

buy_card.forEach((elem, index) => {
  elem.addEventListener('click', () => {
    addToCart(price[index].innerText, title[index].innerText, logo_card[index].src);
  });
});

function addToCart(price_l, title_l, logo_l) {
  // Получаем текущий список товаров в корзине из локального хранилища
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Проверяем, существует ли товар с таким же названием в корзине
  const existingItem = cartItems.find((item) => item.title === title_l);

  if (existingItem) {
    // Если товар уже существует, увеличиваем количество
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // В противном случае, добавляем новый товар в корзину
    const newItem = {
      price: price_l,
      title: title_l,
      logo: logo_l,
      quantity: 1, // Начинаем с одного товара
    };

    cartItems.push(newItem);
  }

  // Сохраняем обновленный список товаров в локальное хранилище
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
document.addEventListener('DOMContentLoaded', function () {
  displayCartItems();
});

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  cartItemsContainer.innerHTML = ''; // Очищаем контейнер перед обновлением

  cartItems.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item'); // Уникальный идентификатор товара
    cartItem.innerHTML = `
        <img src="${item.logo}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <div class="quantity-controls">
          <button class="decrease-quantity">-</button>
          <p>${item.quantity}</p>
          <button class="increase-quantity">+</button>
        </div>
        <button class="remove-item">Удалить</button>
    `;
    cartItemsContainer.appendChild(cartItem);

    // Добавляем обработчики событий для кнопок "Удалить", "Увеличить" и "Уменьшить"
    const removeButton = cartItem.querySelector('.remove-item');
    removeButton.addEventListener('click', () => {
      removeFromCart(item);
      cartItem.remove();
    });

    const increaseButton = cartItem.querySelector('.increase-quantity');
    increaseButton.addEventListener('click', () => {
      increaseCartItemQuantity(item);
      displayCartItems(); // Обновляем отображение корзины
    });

    const decreaseButton = cartItem.querySelector('.decrease-quantity');
    decreaseButton.addEventListener('click', () => {
      decreaseCartItemQuantity(item);
      displayCartItems(); // Обновляем отображение корзины
    });

    // Добавляем обработчик события для инпута "number" при изменении
    const quantityInput = cartItem.querySelector('input[type="number"]');
    quantityInput.addEventListener('change', (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      updateCartItemQuantity(item, newQuantity);
      displayCartItems(); // Обновляем отображение корзины
    });
  });
}

function removeFromCart(item) {
  // Получаем текущий список товаров в корзине из локального хранилища
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Удаляем товар из корзины
  const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  if (index !== -1) {
    cartItems.splice(index, 1);

    // Сохраняем обновленный список товаров в локальное хранилище
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}

function updateCartItemQuantity(item, newQuantity) {
  // Получаем текущий список товаров в корзине из локального хранилища
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Обновляем количество товара
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity = newQuantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}

function increaseCartItemQuantity(item) {
  // Увеличиваем количество товара на 1
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}

function decreaseCartItemQuantity(item) {
  // Уменьшаем количество товара на 1
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}