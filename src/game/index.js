import { userPlayer } from "./player";

export function update() {
  ctx.fillStyle = "#F4F1BB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // console.log("GAME");
  userPlayer.update();
}
