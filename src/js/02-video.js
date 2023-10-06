document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    vimeoPlayer.setCurrentTime(savedTime);
  }
});

import throttle from 'lodash.throttle';

vimeoPlayer.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;

    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000)
); // 1000 мс = 1 секунда
