import "./utilities/utilities.js";

import * as Game from "./game/index.js";
import * as Menu from "./menu/index.js";

const scenes = {
  menu: Menu,
  game: Game,
};

window.changeScene = function (sceneName) {
  scenes[currentScene]?.unload();
  currentScene = sceneName;
  scenes[currentScene]?.load();
};

let currentScene;
changeScene("menu");

let lastTime;
window.time = {
  deltaTime: 0,
  time: 0,
  timeSpeed: 1,
};

function update(currentTime) {
  // Calculate delta time
  time.deltaTime = ((currentTime - lastTime) / 1000) * time.timeSpeed;
  lastTime = currentTime;
  time.time = currentTime / 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  scenes[currentScene]?.update();

  requestAnimationFrame(update);
}

requestAnimationFrame(function (currentTime) {
  lastTime = currentTime;
  update(currentTime);
});
