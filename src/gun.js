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
    this.mobility;
    this.recoil;

    //If fireRate = 0, gun will not continue shooting when held down, useful for pistols
    this.fireRate;
    this.accuracy;

    this.reloadTime;
    this.magCapacity;
    this.bulletsAtOnce;
    this.multipleBulletSpread;

    this.shootNoise = new Howl({ src: ["/temp/submachine-gun-79846.mp3"], loop: false, volume: 1 });

    this.calculateStats(barrel, magazine, grip, body);
  }

  calculateStats(barrel, magazine, grip, body) {
    this.bulletsLeft = magazine.capacity;

    this.barrel = barrel;
    this.magazine = magazine;
    this.grip = grip;
    this.body = body;

    this.mobility = (grip.mobility + body.mobility + barrel.mobility) / 3;
    this.recoil = null;

    this.fireRate = magazine.isAutomatic ? body.fireRate : 0;
    this.accuracy = grip.accuracy;

    this.reloadTime = magazine.reloadTime;
    this.magCapacity = magazine.capacity;
    this.bulletsAtOnce = barrel.bulletsAtOnce;
    this.multipleBulletSpread = barrel.multipleBulletSpread;

    this.BulletClass = magazine.BulletClass;
  }

  shoot(x, y, angle) {
    if (this.bulletsLeft <= 0 || this.isReloading || (time.time - this.lastShot < this.fireRate && this.fireRate > 0)) return;

    this.shootNoise.play();
    this.lastShot = time.time;

    let newBullets = [];
    for (let i = 0; i < this.bulletsAtOnce; i++) {
      let bulletAngle = angle - (this.bulletsAtOnce * this.multipleBulletSpread) / 2 + (i + 0.5) * this.multipleBulletSpread;
      // 0.25 is the max and min accuracy angle
      bulletAngle += (Math.random() - 0.5) * 0.25 * (1 - this.accuracy);

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
    if (this.isReloading || this.bulletsLeft == this.magCapacity) return;
    this.isReloading = true;
    tempReload.play();

    setTimeout(() => {
      this.bulletsLeft = this.magCapacity;
      this.isReloading = false;
    }, this.reloadTime * 1000);
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
