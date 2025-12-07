import { barrel, magazine, grip, body } from "./gunparts";
import { pushBullets } from "./bullet";

let barrelSheet = new Image();
barrelSheet.src = "/temp/barrel.png";

let magSheet = new Image();
magSheet.src = "/temp/magazine.png";

const tempReload = new Howl({ src: ["/temp/reload.mp3"], loop: false, volume: 1 });

class Gun {
  constructor() {
    this.bulletsLeft = 0;
    this.isReloading = false;
    this.lastShot = 0;

    //DATA
    this.MOBILITY;
    this.recoil;

    //If FIRE_RATE = 0, gun will not continue shooting when held down, useful for pistols
    this.FIRE_RATE;
    this.ACCURACY;

    this.RELOAD_TIME;
    this.MAG_CAPACITY;
    this.BULLETS_AT_ONCE;
    this.MULTIPLE_BULLET_SPREAD;

    this.SHOOT_NOISE = new Howl({ src: ["/temp/submachine-gun-79846.mp3"], loop: false, volume: 1 });

    this.calculateStats(barrel, magazine, grip, body);
  }

  calculateStats(barrel, magazine, grip, body) {
    this.bulletsLeft = magazine.CAPACITY;

    this.barrel = barrel;
    this.magazine = magazine;
    this.grip = grip;
    this.body = body;

    this.MOBILITY = (grip.MOBILITY + body.MOBILITY + barrel.MOBILITY) / 3;
    this.recoil = null;

    this.FIRE_RATE = magazine.IS_AUTOMATIC ? body.FIRE_RATE : 0;
    this.ACCURACY = grip.ACCURACY;

    this.RELOAD_TIME = magazine.RELOAD_TIME;
    this.MAG_CAPACITY = magazine.CAPACITY;
    this.BULLETS_AT_ONCE = barrel.BULLETS_AT_ONCE;
    this.MULTIPLE_BULLET_SPREAD = barrel.MULTIPLE_BULLET_SPREAD;

    this.BulletClass = magazine.BulletClass;
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
    if (this.barrel.showMag)
      ctx.drawImage(
        magSheet,
        this.magazine.imgCellX * SPRITE_SIZE,
        0,
        SPRITE_SIZE,
        SPRITE_SIZE * 2,
        -SPRITE_SIZE / 2,
        -SPRITE_SIZE * 2.4,
        SPRITE_SIZE,
        SPRITE_SIZE * 2
      );

    //Barrel
    ctx.drawImage(
      barrelSheet,
      this.barrel.imgCellX * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE * 2,
      -SPRITE_SIZE / 2,
      -SPRITE_SIZE * 2.4,
      SPRITE_SIZE,
      SPRITE_SIZE * 2
    );
  }
}

//Right now stats are hard coded, later they will be calculated based on the parts used to make them
export const gun = new Gun();
