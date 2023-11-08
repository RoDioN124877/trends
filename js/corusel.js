const carousel = document.querySelector('.carousel');
const container = carousel.querySelector('.carousel-container');
const slides = carousel.querySelectorAll('.carousel-slide');
const prevButton = carousel.querySelector('.prev-button');
const nextButton = carousel.querySelector('.next-button');
const indicators = carousel.querySelector('.carousel-indicators');

const slideWidth = slides[0].offsetWidth;
let currentIndex = 0;
let intervalId = null;
let userActivity = false; // Изначально устанавливаем, что пользователь не активен

function goToSlide(index) {
  container.style.transform = `translateX(-${index * slideWidth}px)`;
}

function updateIndicators() {
  const activeIndicator = carousel.querySelector('.active');
  if (activeIndicator) {
    activeIndicator.classList.remove('active');
  }
  indicators.children[currentIndex].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  goToSlide(currentIndex);
  updateIndicators();
  userActivity = true; // Обновляем переменную активности пользователя при взаимодействии с кнопкой
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(currentIndex);
  updateIndicators();
  userActivity = true; // Обновляем переменную активности пользователя при взаимодействии с кнопкой
}

nextButton.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide(); // Сбрасываем автоматическую прокрутку при взаимодействии с кнопкой
});

prevButton.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide(); // Сбрасываем автоматическую прокрутку при взаимодействии с кнопкой
});

// Создаем индикаторы для каждого слайда
slides.forEach((slide, index) => {
  const indicator = document.createElement('span');
  indicator.addEventListener('click', () => {
    currentIndex = index;
    goToSlide(currentIndex);
    updateIndicators();
    userActivity = true; // Обновляем переменную активности пользователя при взаимодействии с индикатором
    resetAutoSlide(); // Сбрасываем автоматическую прокрутку при взаимодействии с индикатором
  });
  indicators.appendChild(indicator);
});

updateIndicators(); // Устанавливаем активный индикатор для начального слайда

// Функция для автоматической прокрутки слайдов
function autoSlide() {
  if (!userActivity) {
    nextSlide(); // Если пользователь неактивен, переключаем на следующий слайд
  }
}

// Запускаем автоматическую прокрутку каждые 3 секунды
function startAutoSlide() {
  intervalId = setInterval(autoSlide, 3000);
}

// Сбрасываем автоматическую прокрутку и устанавливаем пользовательскую активность в false
function resetAutoSlide() {
  clearInterval(intervalId);
  userActivity = false;
  startAutoSlide();
}

// Запускаем автоматическую прокрутку при загрузке страницы
startAutoSlide();