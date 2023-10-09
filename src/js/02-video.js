import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Vimeo(document.getElementById('vimeo-player'));
const localStorageKey = 'videoplayer-current-time';

const saveCurrentTime = throttle(currentTime => {
  localStorage.setItem(localStorageKey, currentTime);
}, 1000);

vimeoPlayer.on('timeupdate', data => {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem(localStorageKey);

  if (savedTime) {
    vimeoPlayer.setCurrentTime(parseFloat(savedTime)).catch(error => {
      console.error('Помилка встановлення часу відтворення:', error);
    });
  }
});
