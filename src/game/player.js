const playerConfig = {
  maxSpeed: 4000, // Acceleration
  maxRecoil: 2000,
  friction: 10,

  radius: 50,

  image: new Image(),
  gun: new Image(),
};

playerConfig.image.src = "/temp/player.png";
playerConfig.gun.src = "/temp/barrel.png";

class Player {
  constructor(x, y) {
    //Position stuff
    this.x = x;
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.angle = 0;

    //Gun stuff
    this.gun;

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
    if (mouse.isDown) {
      if (time.time - this.gun.lastShot > this.gun.FIRE_RATE && this.gun.FIRE_RATE > 0) {
        this.gun.shoot(this.x, this.y, this.angle);
      }
    }

    let dir = { x: 0, y: 0 };
    if (keysDown["KeyW"]) dir.y--;
    if (keysDown["KeyS"]) dir.y++;
    if (keysDown["KeyA"]) dir.x--;
    if (keysDown["KeyD"]) dir.x++;

    dir = normalize(dir);

    // Acceleration is multiplied by gun mobility
    let acceleration = playerConfig.maxSpeed * this.gun.MOBILITY;

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

  destroy() {
    removeEventListener("mousedown", this.onMouseDown);
    removeEventListener("keydown", this.onKeyDown);
  }
}

export let userPlayer;

export function loadPlayer() {
  userPlayer = new Player(canvas.width / 2, canvas.height / 2);
}
