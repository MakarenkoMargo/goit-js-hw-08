import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

/*player.on('timeupdate', function (data) {
  var time = data.seconds;
  console.log('Час відтворення', time);
});
*/
const STORAGE_KEY = 'videoplayer-current-time';
onPageLoad();

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

function onPlayerTimeUpdate(time) {
  localStorage.setItem(STORAGE_KEY, time.seconds);
}

function onPageLoad() {
  const currentTime = localStorage.getItem(STORAGE_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}
