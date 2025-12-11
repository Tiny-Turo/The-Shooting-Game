export class Gun {
  constructor(body, magazine, grip, action) {
    this.calculateStats(body, magazine, grip, action);

    this.isReloading = false;
    this.lastShot = 0;

    this.SHOOT_NOISE = new Howl({ src: ["/temp/submachine-gun-79846.mp3"], loop: false, volume: 1 });
  }

  calculateStats(body, magazine, grip, action) {
    this.bulletsLeft = magazine.CAPACITY;

    this.body = body;
    this.magazine = magazine;
    this.grip = grip;
    this.action = action;

    this.MOBILITY = (grip.MOBILITY + action.MOBILITY) / 3;

    this.FIRE_RATE = magazine.IS_AUTOMATIC ? action.FIRE_RATE : 0;
    this.ACCURACY = grip.ACCURACY;

    this.RELOAD_TIME = magazine.RELOAD_TIME;
    this.MAG_CAPACITY = magazine.CAPACITY;
    this.BULLETS_AT_ONCE = body.BULLETS_AT_ONCE;
    this.MULTIPLE_BULLET_SPREAD = body.MULTIPLE_BULLET_SPREAD;

    this.BulletClass = body.BulletClass;
  }

  shoot(x, y, angle) {
    if (this.bulletsLeft <= 0 || this.isReloading || (time.time - this.lastShot < this.FIRE_RATE && this.FIRE_RATE > 0)) return;

    this.SHOOT_NOISE.play();
    this.lastShot = time.time;

    let newBullets = [];
    for (let i = 0; i < this.BULLETS_AT_ONCE; i++) {
      let bulletAngle = angle - (this.BULLETS_AT_ONCE * this.MULTIPLE_BULLET_SPREAD) / 2 + (i + 0.5) * this.MULTIPLE_BULLET_SPREAD;
      // 0.25 is the max and min ACCURACY angle
      bulletAngle += (Math.random() - 0.5) * 0.25 * (1 - this.ACCURACY);

      const bulletDirection = angleToVector(bulletAngle);
      const newBullet = new this.BulletClass(x, y, bulletDirection.x, bulletDirection.y);
      newBullets.push(newBullet);
    }

    pushBullets(newBullets);

    this.bulletsLeft -= 1; //Even if it shoots multiple bullets at once, count it as one

    if (this.bulletsLeft <= 0) {
      this.reload();
    }
  }

  reload() {
    //Will not reload if is already reloading or mag is full
    if (this.isReloading || this.bulletsLeft == this.MAG_CAPACITY) return;
    this.isReloading = true;
    tempReload.play();

    setTimeout(() => {
      this.bulletsLeft = this.MAG_CAPACITY;
      this.isReloading = false;
    }, this.RELOAD_TIME * 1000);
  }

  draw() {
    //Mag
    if (this.body.showMag)
      ctx.drawImage(
        magSheet,
        this.magazine.imgCellX * SPRITE_SIZE,
        0,
        SPRITE_SIZE,
        SPRITE_SIZE * 2,
        -SPRITE_SIZE / 2,
        -SPRITE_SIZE * 2.45,
        SPRITE_SIZE,
        SPRITE_SIZE * 2
      );

    //Body
    ctx.drawImage(
      barrelSheet,
      this.body.imgCellX * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE * 2,
      -SPRITE_SIZE / 2,
      -SPRITE_SIZE * 2.45,
      SPRITE_SIZE,
      SPRITE_SIZE * 2
    );
  }
}

export let gun;
