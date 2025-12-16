import { gun } from "../gun";
import "./modgun";
import { updateButtons, Button, clearButtons } from "./button";
import { drawStats, loadButtons } from "./modgun";

export function update() {
  ctx.fillStyle = "#D8D0C1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStats();

  updateButtons();
  gun.drawSide();
}

export function load() {
  new Button({ x: canvas.width / 2 - 200 - 100 - 15, y: canvas.height / 2 + 150, trigger: play });
  loadButtons();
}

export function unload() {
  clearButtons();
}

function play() {
  changeScene("game");
}
