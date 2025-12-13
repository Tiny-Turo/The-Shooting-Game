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
  constructor(X, Y, trigger, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;

    this.trigger = trigger;

    buttons.push(this);
  }

  update() {}

  isMouseOn() {
    return mouse.x > this.X && mouse.x < this.X + this.width && mouse.y > this.Y && mouse.y < this.Y + this.height;
  }

  draw() {
    ctx.fillStyle = "#E2C044";

    if (this.isMouseOn()) ctx.fillStyle = "#B19738";

    ctx.fillRect(this.X, this.Y, this.width, this.height);
  }

  press() {
    this.trigger();
  }
}
