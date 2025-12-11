import { updateButtons, Button } from "./button";

export function update() {
  ctx.fillStyle = "#555252";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateButtons();
}

export function load() {}

export function unload() {}
