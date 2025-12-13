let buttons = [];

export function updateButtons() {
  for (const button of buttons) {
    button.update();
    button.draw();
  }
}

export function clearButtons() {
  buttons = [];
}

addEventListener("mousedown", (e) => {
  for (const button of buttons) {
    if (button.isMouseOn()) button.press();
  }
});

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 100;

export class Button {
  constructor(x, y, trigger, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, greyOutTrigger = null) {
    Object.assign(this, { x, y, trigger, width, height, greyOutTrigger });

    buttons.push(this);
  }

  update() {}

  isMouseOn() {
    return mouse.x > this.x && mouse.x < this.x + this.width && mouse.y > this.y && mouse.y < this.y + this.height;
  }

  draw() {
    ctx.fillStyle = "#E2C044";

    if (this.isMouseOn() || this.greyOutTrigger?.()) ctx.fillStyle = "#B19738";

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  press() {
    if (!this.greyOutTrigger?.()) this.trigger();
  }
}
