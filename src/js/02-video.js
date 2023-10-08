import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Vimeo(document.getElementById('vimeo-player'));

const saveCurrentTime = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

vimeoPlayer.on('timeupdate', data => {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    vimeoPlayer.setCurrentTime(parseFloat(savedTime)).catch(error => {
      console.error('Помилка встановлення часу відтворення:', error);
    });
  }
});
