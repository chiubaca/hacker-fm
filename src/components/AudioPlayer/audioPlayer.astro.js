/* eslint-disable no-param-reassign */
import { dragmove } from '@knadh/dragmove';

const appContainer = document.querySelector('.music-app');
const dragHandler = document.querySelector('.music-app-top-bar');

// Initial position of the music app
appContainer.style.bottom = '4rem';
appContainer.style.left = '1.5rem';

const snapThreshold = 1;
function onStart(el) {
  // On drag start, remove the fixed bottom style to prevent the bottom
  // from sticking on the screen.
  el.style.top = `${el.offsetTop}px`;
  el.style.bottom = 'auto';
}
function onEnd(el) {
  // Automatically snap to corners.
  if (window.innerHeight - (el.offsetTop + el.offsetHeight) < snapThreshold) {
    el.style.top = 'auto';
    el.style.bottom = '0px';
  }
  if (window.innerWidth - (el.offsetLeft + el.offsetWidth) < snapThreshold) {
    el.style.left = 'auto';
    el.style.right = '0px';
  }
  if (el.offsetTop < snapThreshold) {
    el.style.top = '0px';
  }
  if (el.offsetLeft < snapThreshold) {
    el.style.left = '0px';
  }
}
dragmove(appContainer, dragHandler, onStart, onEnd);

/**
 * Radio Icon click handlers
 * clicking the app toggle the visibility and audio of the music app
 */
const appDesktopIcon = document.querySelector('.music-app-desktop-icon');
const audio = document.querySelector('audio');

let musicIsPaused;

appDesktopIcon.addEventListener('click', () => {
  if (appContainer.style.visibility === 'visible') {
    return;
  }

  appContainer.style.visibility = 'visible';

  musicIsPaused = musicIsPaused ? null : audio.play();
});

const closeAppButton = document.querySelector('.close-app');
closeAppButton.addEventListener('click', () => {
  appContainer.style.visibility = 'hidden';
  musicIsPaused = audio.paused;
  audio.pause();
});
