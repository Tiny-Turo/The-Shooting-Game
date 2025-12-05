import { userPlayer } from "./player";
import { gun } from "./gun"; // Will change :)

export function update() {
  ctx.fillStyle = "#F4F1BB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  userPlayer.update();
}

export function load() {
  userPlayer.giveGun(gun);
}
