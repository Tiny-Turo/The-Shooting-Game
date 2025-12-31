let bulletSheet = new Image();
bulletSheet.src = "/sprites/bullets.png";

function segmentIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {
  let t0 = 0;
  let t1 = 1;
  const dx = x2 - x1;
  const dy = y2 - y1;

  function clip(p, q) {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
    return true;
  }

  return clip(-dx, x1 - rx) && clip(dx, rx + rw - x1) && clip(-dy, y1 - ry) && clip(dy, ry + rh - y1);
}

class Bullet {
  constructor(x, y, dirX, dirY, power, destroy = false) {
    Object.assign(this, { x, y, dirX, dirY, power });

    this.speed = 2500;

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
    const oldX = this.x;
    const oldY = this.y;

    const newX = oldX + this.dirX * this.speed * time.deltaTime;
    const newY = oldY + this.dirY * this.speed * time.deltaTime;

    if (destroyOnCollision) {
      for (const wall of walls) {
        if (segmentIntersectsRect(oldX, oldY, newX, newY, wall.x, wall.y, wall.width, wall.height)) {
          this.destroy = true;
          return;
        }
      }
    }

    this.x = newX;
    this.y = newY;
  }
}

class ShotgunShell extends Bullet {
  constructor(x, y, dirX, dirY, power) {
    super(x, y, dirX, dirY, power);

    this.speed = 4000;
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
    this.speed = 2000;
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
      const hit = segmentIntersectsRect(this.prevX, this.prevY, this.x, this.y, w.x, w.y, w.width, w.height);

      if (hit) {
        if (!this.isColliding) {
          // Move bullet to wall surface (approx)
          this.x = Math.max(w.x, Math.min(this.x, w.x + w.width));
          this.y = Math.max(w.y, Math.min(this.y, w.y + w.height));

          // Bounce using your existing logic
          this.bouncePointRect(this, w);

          this.bounces--;
          this.isColliding = true;
        }
        return;
      }
    }

    // No wall hit → reset
    this.isColliding = false;
  }

  update(walls) {
    if (this.bounces <= 0) {
      this.destroy = true;
      return;
    }

    this.prevX = this.x;
    this.prevY = this.y;

    super.update(walls, false);

    this.colliding(walls);
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
    if (this.bounces <= 0) {
      this.destroy = true;
      return;
    }

    this.prevX = this.x;
    this.prevY = this.y;

    this.x += this.dirX * time.deltaTime;
    this.y += this.dirY * time.deltaTime;

    super.colliding(walls);

    this.angle += Math.PI * time.deltaTime;

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
