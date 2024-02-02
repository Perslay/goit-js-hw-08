import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onPlay = data => {
  try {
    const currentTime = JSON.stringify(data.seconds);
    localStorage.setItem('videoplayer-current-time', currentTime);
  } catch (error) {
    console.log(error);
  }
};

const throttlePlay = throttle(onPlay, 1000);

player.on('timeupdate', throttlePlay);

try {
  player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time'))
  );
} catch (error) {
  switch (error.name) {
    case 'RangeError':
      console.log(
        'The time was less than 0 or greater than the video’s duration'
      );
      break;

    default:
      console.log('An error occured');
      break;
  }
}
