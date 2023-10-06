import { Player } from '@vimeo/player';

const player = new Player('vimeo-player');

// Відстежуємо подію timeupdate
player.on('timeupdate', function (event) {
  const currentTime = event.seconds; // Отримуємо поточний час відтворення

  // Зберігаємо поточний час в локальне сховище
  localStorage.setItem('videoplayer-current-time', currentTime);
});

// Отримуємо збережений час відтворення з локального сховища
const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime !== null) {
  // Встановлюємо час відтворення збереженого часу
  player.setCurrentTime(savedTime);
}

// Відтворюємо відео
player.play();

import throttle from 'lodash.throttle';

// Функція для збереження часу відтворення з обмеженням через throttle
const saveTimeToLocalStorage = throttle(time => {
  localStorage.setItem('videoplayer-current-time', time);
}, 1000); // Оновлювати не частіше одного разу на секунду

// Відстежуємо подію timeupdate з використанням збереження часу з обмеженням
player.on('timeupdate', function (event) {
  const currentTime = event.seconds;
  saveTimeToLocalStorage(currentTime);
});
