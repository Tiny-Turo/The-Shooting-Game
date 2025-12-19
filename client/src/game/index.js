import { updateBullets } from "./bullets";
import { gun } from "../gun";
import { loadPlayer, userPlayer, drawPlayer } from "./player";
import { drawWalls, walls } from "./walls";
import { players, updateToServer } from "./connections";

export function update() {
  ctx.fillStyle = "#769B46";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawWalls();

  updateBullets(walls);
  userPlayer.update();
  userPlayer.checkCollisions(walls);

  for (const player of Object.values(players)) {
    drawPlayer(player);
  }

  updateToServer(userPlayer);
}

export function load() {
  canvas.style.cursor = "default";
  loadPlayer();
  userPlayer.giveGun(gun);
}

export function unload() {
  userPlayer.destroy();
}
