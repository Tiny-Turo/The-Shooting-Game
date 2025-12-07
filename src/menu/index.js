import { updateButtons, Button } from "./button";
import { Gun, gun } from "../gun";
import { showStats, makeGun } from "./changegun";

export function update() {
  ctx.fillStyle = "#555252";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateButtons();

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  gun.draw();

  ctx.restore();

  showStats();
}

export function load() {
  makeGun();
}

export function unload() {}

new Button(0, 800, joinGame);

function joinGame() {
  changeScene("game");
}
