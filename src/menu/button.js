let buttons = [];
//TEMP
let buttonClick = new Howl({
  src: ["/temp/ui-pop-sound-316482.mp3"],
  loop: false,
  volume: 1,
});

export function updateButtons() {
  let isMouseOnButton = false;
  for (const button of buttons) {
    button.update();
    button.draw();
    if (button.isMouseOn() && !button.disableTrigger?.()) {
      canvas.style.cursor = "pointer";
      isMouseOnButton = true;
    }
  }

  if (!isMouseOnButton) canvas.style.cursor = "default";
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
  constructor({ x, y, trigger, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, disableTrigger = null, isVisible = true }) {
    Object.assign(this, { x, y, trigger, width, height, disableTrigger, isVisible });

    buttons.push(this);
  }

  update() {}

  isMouseOn() {
    return mouse.x > this.x && mouse.x < this.x + this.width && mouse.y > this.y && mouse.y < this.y + this.height;
  }

  draw() {
    if (!this.isVisible) return;

    ctx.fillStyle = "#E2C044";
    if (this.isMouseOn() || this.disableTrigger?.()) ctx.fillStyle = "#B19738";

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  press() {
    if (!this.disableTrigger?.()) {
      this.trigger();
      buttonClick.play();
    }
  }
}
