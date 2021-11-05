import { dragmove } from "@knadh/dragmove";

const target = document.querySelector(".music-app");
const dragHandler = document.querySelector(".music-app-top-bar");

// Initial position of the music app
target.style.bottom = `4rem`;
target.style.left = `1.5rem`;

const snapThreshold = 1;
function onStart(el, x, y) {
  // On drag start, remove the fixed bottom style to prevent the bottom
  // from sticking on the screen.
  el.style.top = el.offsetTop + "px";
  el.style.bottom = "auto";
}
function onEnd(el, x, y) {
  // Automatically snap to corners.
  if (window.innerHeight - (el.offsetTop + el.offsetHeight) < snapThreshold) {
    el.style.top = "auto";
    el.style.bottom = "0px";
  }
  if (window.innerWidth - (el.offsetLeft + el.offsetWidth) < snapThreshold) {
    el.style.left = "auto";
    el.style.right = "0px";
  }
  if (el.offsetTop < snapThreshold) {
    el.style.top = "0px";
  }
  if (el.offsetLeft < snapThreshold) {
    el.style.left = "0px";
  }
}
dragmove(target, dragHandler, onStart, onEnd);

/**
 * The app icon stuff
 * clicking the app toggle the visibility and audio of the music app
 */
const appDesktopIcon = document.querySelector(".music-app-desktop-icon");
const audio = document.querySelector("audio");

appDesktopIcon.addEventListener("click", () => {
  if (target.style.visibility === "hidden") {
    target.style.visibility = "visible";
    audio.play();
  } else {
    target.style.visibility = "hidden";
    audio.pause();
  }
});
