import { gun } from "../gun";
import { updateButtons, Button } from "./button";

export function update() {
  ctx.fillStyle = "#D8D0C1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateButtons();

  gun.drawSide();
}

export function load() {}

export function unload() {}
