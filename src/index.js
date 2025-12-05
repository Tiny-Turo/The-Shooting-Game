import "./utilities/utilities.js";

import * as Game from "./game/index.js";
import * as Menu from "./menu/index.js";

const scenes = {
  menu: Menu,
  game: Game,
};

window.changeScene = function (sceneName) {
  currentScene = sceneName;
  scenes[currentScene].load();
};

let currentScene;
changeScene("game");

let lastTime;
window.time = {
  deltaTime: 0,
  time: 0,
};

function update(currentTime) {
  // Calculate delta time
  time.deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  time.time = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  scenes[currentScene].update();

  requestAnimationFrame(update);
}

requestAnimationFrame(function (currentTime) {
  lastTime = currentTime;
  update(currentTime);
});
