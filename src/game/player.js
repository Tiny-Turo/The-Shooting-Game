import { resolveCircleRect } from "./walls";

const playerConfig = {
  maxSpeed: 2500, // Acceleration
  minSpeed: 700,

  maxRecoil: 2000,
  friction: 10,

  radius: 50,

  image: new Image(),
};

playerConfig.image.src = "/sprites/player.png";

class Player {
  constructor(x, y) {
    //Position stuff
    this.x = x;
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.angle = 0;

    this.onMouseDown = (e) => {
      this.gun.shoot(this.x, this.y, this.angle);
    };

    this.onKeyDown = (e) => {
      if (e.code == "KeyR") this.gun.reload();
      if (e.code == "Escape") changeScene("menu");
    };

    addEventListener("mousedown", this.onMouseDown);
    addEventListener("keydown", this.onKeyDown);
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = "#ED6A5A";

    this.gun.draw();
    ctx.drawImage(playerConfig.image, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE);

    ctx.restore();
  }

  giveGun(gun) {
    this.gun = gun;
  }

  update() {
    //Check if player shoots
    if (mouse.isDown && this.gun.isAutomatic) {
      this.gun.shoot(this.x, this.y, this.angle);
    }

    let dir = { x: 0, y: 0 };
    if (keysDown["KeyW"]) dir.y--;
    if (keysDown["KeyS"]) dir.y++;
    if (keysDown["KeyA"]) dir.x--;
    if (keysDown["KeyD"]) dir.x++;

    dir = normalize(dir);

    // Acceleration is multiplied by gun mobility
    let acceleration = lerp(playerConfig.minSpeed, playerConfig.maxSpeed, this.gun.mobility / MAX_STAT_VALUE);

    this.velocity.x += dir.x * acceleration * time.deltaTime;
    this.velocity.y += dir.y * acceleration * time.deltaTime;

    //Friction
    const frictionBlend = Math.pow(0.5, time.deltaTime * playerConfig.friction);
    this.velocity.x = lerp(0, this.velocity.x, frictionBlend);
    this.velocity.y = lerp(0, this.velocity.y, frictionBlend);

    //Movement
    this.x += this.velocity.x * time.deltaTime;
    this.y += this.velocity.y * time.deltaTime;

    this.angle = angleTo(this, mouse);

    this.draw();
  }

  checkCollisions(walls) {
    for (const wall of walls) {
      const pos = resolveCircleRect({ x: this.x, y: this.y, radius: playerConfig.radius }, wall);
      if (pos) {
        this.x = pos.newX;
        this.y = pos.newY;
      }
    }
  }

  destroy() {
    removeEventListener("mousedown", this.onMouseDown);
    removeEventListener("keydown", this.onKeyDown);
  }
}

export let userPlayer;

export function loadPlayer() {
  userPlayer = new Player(canvas.width / 2, canvas.height / 2);
}
