let bulletSheet = new Image();
bulletSheet.src = "/temp/bullets.png";

export class Bullet {
  constructor(x, y, dirX, dirY, power) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;

    this.power = power;

    this.speed = 2000;

    this.imageIndex = 0;
    this.angle = angleTo({ x: 0, y: 0 }, { x: dirX, y: dirY });

    this.destroy = false;
    this.spawn();
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.drawImage(bulletSheet, this.imageIndex * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE);

    ctx.restore();
  }

  spawn() {}

  update() {
    this.x += this.dirX * this.speed * time.deltaTime;
    this.y += this.dirY * this.speed * time.deltaTime;
  }
}

export class ShotgunShell extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 1;
  }

  update() {
    super.update();
    super.draw();
  }
}

export class BallBullet extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 2;
  }

  update() {
    super.update();
    super.draw();
  }
}

export class SniperBullet extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 3;
  }

  update() {
    super.update();
    super.draw();
  }
}
