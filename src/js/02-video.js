import Player from '@vimeo/player'; // Імпорт бібліотеки Vimeo Player
import throttle from 'lodash.throttle'; // Імпорт бібліотеки lodash.throttle

// Ініціалізація плеєра Vimeo
const vimeoPlayer = new Player(document.getElementById('vimeo-player'), {
  /* налаштування плеєра */
});

// Відстеження події timeupdate і збереження часу в локальному сховищі
vimeoPlayer.on('timeupdate', data => {
  const currentTime = data.seconds; // Поточний час відтворення у секундах

  // Збереження поточного часу відтворення в локальне сховище
  localStorage.setItem('videoplayer-current-time', currentTime);
});

// Відновлення часу відтворення під час завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    vimeoPlayer.setCurrentTime(savedTime);
  }
});

// Використання lodash.throttle для збереження часу відтворення не частіше, ніж раз на секунду
vimeoPlayer.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;

    // Збереження поточного часу відтворення в локальне сховище
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000) // 1000 мс = 1 секунда
);
