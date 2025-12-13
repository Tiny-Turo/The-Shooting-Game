import { gun } from "../gun";
import { updateButtons, Button, clearButtons } from "./button";

export function update() {
  ctx.fillStyle = "#D8D0C1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateButtons();

  gun.drawSide();
}

export function load() {
  new Button(canvas.width / 2 - 200, canvas.height / 2 + 150, play);
}

export function unload() {
  clearButtons();
}

function play() {
  changeScene("game");
}
