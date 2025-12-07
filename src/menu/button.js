export let buttons = [];

export function updateButtons() {
  for (const button of buttons) {
    bullet.update();
    bullet.draw();
  }
}

const defaultSize = {
  x: 200,
  y: 100,
};

class Button {
  constructor(position, trigger, size = defaultSize) {
    this.position = position;
    this.trigger = trigger;
    this.size = size;

    buttons.push(this);
  }

  update() {}

  draw() {
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }

  onPress() {
    this.trigger();
  }
}
