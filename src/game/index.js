import { userPlayer } from "./player";
import { gun } from "../gun"; // Will change :)
import { updateBullets } from "../bullet";

export function update() {
  ctx.fillStyle = "#769B46";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateBullets();
  userPlayer.update();
}

export function load() {
  userPlayer.giveGun(gun);
}
