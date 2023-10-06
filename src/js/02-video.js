import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player(document.getElementById('vimeo-player'), {});

vimeoPlayer.on('timeupdate', data => {
  const currentTime = data.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    vimeoPlayer.setCurrentTime(savedTime);
  }
});

vimeoPlayer.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;

    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000)
);
