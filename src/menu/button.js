export let buttons = [];

export function updateButtons() {
  for (const button of buttons) {
    button.update();
    button.draw();
  }
}

addEventListener("mousedown", (e) => {
  for (const button of buttons) {
    if (button.isMouseOn()) button.press();
  }
});

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 100;

export class Button {
  constructor(X, Y, trigger, WIDTH = DEFAULT_WIDTH, HEIGHT = DEFAULT_HEIGHT) {
    this.X = X;
    this.Y = Y;
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;

    this.trigger = trigger;

    buttons.push(this);
  }

  update() {}

  isMouseOn() {
    return mouse.x > this.X && mouse.x < this.X + this.WIDTH && mouse.y > this.Y && mouse.y < this.Y + this.HEIGHT;
  }

  draw() {
    ctx.fillStyle = "#769B46";

    if (this.isMouseOn()) ctx.fillStyle = "red";

    ctx.fillRect(this.X, this.Y, this.WIDTH, this.HEIGHT);
  }

  press() {
    this.trigger();
  }
}
