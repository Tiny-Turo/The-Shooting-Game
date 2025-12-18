import { updateBullets } from "./bullets";
import { gun } from "../gun";
import { loadPlayer, userPlayer } from "./player";
import { drawWalls, walls } from "./walls";

export function update() {
  ctx.fillStyle = "#769B46";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawWalls();

  updateBullets(walls);
  userPlayer.update();
  userPlayer.checkCollisions(walls);
}

export function load() {
  canvas.style.cursor = "default";
  loadPlayer();
  userPlayer.giveGun(gun);
}

export function unload() {
  userPlayer.destroy();
}
