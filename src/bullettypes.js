let bulletSheet = new Image();
bulletSheet.src = "/temp/bullet.png";

export class Bullet {
  constructor(x, y, dirX, dirY, power) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;

    this.power = power;

    this.speed = 2000;

    this.imageIndex = 0;

    this.destroy = false;
    this.spawn();
  }

  draw() {
    ctx.drawImage(
      bulletSheet,
      this.imageIndex * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.x - SPRITE_SIZE / 2,
      this.y - SPRITE_SIZE / 2,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }

  spawn() {}

  update() {
    this.x += this.dirX * this.speed * time.deltaTime;
    this.y += this.dirY * this.speed * time.deltaTime;
  }
}

export class RubberBullet extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.speed = 1000;
    this.imageIndex = 1;
    this.bounces = 3;
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.dirX *= -1;
      this.bounces--;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dirY *= -1;
      this.bounces--;
    }

    super.update();

    if (this.bounces < 0) {
      this.destroy = true;
    }
  }
}

export class ShotgunShell extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 2;
    this.angle = angleTo({ x: 0, y: 0 }, { x: dirX, y: dirY });
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.drawImage(bulletSheet, this.imageIndex * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE);

    ctx.restore();
  }

  update() {
    super.update();
  }
}

export class SmallBullet extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 3;
    this.angle = angleTo({ x: 0, y: 0 }, { x: dirX, y: dirY });
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(bulletSheet, this.imageIndex * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE);

    ctx.fillStyle = "red";
    ctx.fillRect(-SPRITE_SIZE / 2, -SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE);
    ctx.restore();
  }

  update() {
    super.update();
  }
}
