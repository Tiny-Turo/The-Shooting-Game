let bulletSheet = new Image();
bulletSheet.src = "/sprites/bullets.png";

class Bullet {
  constructor(x, y, dirX, dirY, power, destroy = false) {
    Object.assign(this, { x, y, dirX, dirY, power });

    this.speed = 2000;

    this.imageIndex = 0;
    this.angle = angleTo({ x: 0, y: 0 }, { x: dirX, y: dirY });

    this.destroy = destroy;
    this.load();
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.drawImage(bulletSheet, this.imageIndex * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE);

    ctx.restore();
  }

  load() {}

  update(walls, destroyOnCollision = true) {
    for (const wall of walls) {
      if (this.x > wall.x && this.y > wall.y && this.x < wall.x + wall.width && this.y < wall.y + wall.height && destroyOnCollision) this.destroy = true;
    }

    this.x += this.dirX * this.speed * time.deltaTime;
    this.y += this.dirY * this.speed * time.deltaTime;
  }
}

class ShotgunShell extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 1;
  }

  update(walls) {
    super.update(walls);
  }
}

class BallBullet extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 2;
  }

  update(walls) {
    super.update(walls);
  }
}

class SniperBullet extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.imageIndex = 3;
  }

  update(walls) {
    super.update(walls);
  }
}

class RubberBullet extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);
    this.imageIndex = 4;
    this.isColliding = false;

    this.bounces = 6;
  }

  bouncePointRect(bullet, rect) {
    const left = Math.abs(bullet.x - rect.x);
    const right = Math.abs(bullet.x - (rect.x + rect.width));
    const top = Math.abs(bullet.y - rect.y);
    const bottom = Math.abs(bullet.y - (rect.y + rect.height));

    const min = Math.min(left, right, top, bottom);

    if (min === left || min === right) {
      bullet.dirX *= -1; // hit vertical side
    } else {
      bullet.dirY *= -1; // hit horizontal side
    }
  }

  colliding(walls) {
    for (const w of walls) {
      if (this.x >= w.x && this.x <= w.x + w.width && this.y >= w.y && this.y <= w.y + w.height) {
        if (!this.isColliding) {
          this.bouncePointRect(this, w);
          this.bounces--;
          this.isColliding = true;
        }
        return;
      }
    }
    this.isColliding = false;
  }

  update(walls) {
    if (this.bounces <= 0) this.destroy = true;
    super.update(walls, false); // moves bullet
    this.colliding(walls); // bounce check
  }
}

class Grenade extends RubberBullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);
    this.dirX = dirX * this.speed; // Use as velocity
    this.dirY = dirY * this.speed;

    this.imageIndex = 5;
  }

  update(walls) {
    super.colliding(walls);
    this.angle += Math.PI * time.deltaTime;

    this.x += this.dirX * time.deltaTime;
    this.y += this.dirY * time.deltaTime;

    const blend = Math.pow(0.5, 2 * time.deltaTime);
    this.dirX *= blend;
    this.dirY *= blend;
  }
}

export const BulletClassMap = {
  Bullet: Bullet,
  ShotgunShell: ShotgunShell,
  BallBullet: BallBullet,
  SniperBullet: SniperBullet,
  Grenade: Grenade,
};
