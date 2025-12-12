import { updateBullets } from "./bullets";
import { gun } from "../gun";
import { loadPlayer, userPlayer } from "./player";

export function update() {
  ctx.fillStyle = "#769B46";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  userPlayer.update();

  updateBullets();
}

export function load() {
  loadPlayer();
  userPlayer.giveGun(gun);
}

export function unload() {}
