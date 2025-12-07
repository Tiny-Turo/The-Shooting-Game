import { barrel, magazine, grip, body } from "./gunparts";

let gunPartSheet = new Image();
gunPartSheet.src = "/temp/barrel.png";

class Gun {
  constructor() {
    this.mobility;
    this.recoil;

    //If fireRate = 0, gun will not continue shooting when held down, useful for pistols
    this.fireRate;
    this.accuracy;

    this.reloadTime;
    this.magCapacity;
    this.bulletsAtOnce;
    this.multipleBulletSpread;

    this.shootNoise = new Howl({ src: ["/temp/low-pop-368761.mp3"], loop: false, volume: 1 });

    this.calculateStats(barrel, magazine, grip, body);
  }

  calculateStats(barrel, magazine, grip, body) {
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
    let bullets = [];
    for (let i = 0; i < this.bulletsAtOnce; i++) {
      let bulletAngle = angle - (this.bulletsAtOnce * this.multipleBulletSpread) / 2 + (i + 0.5) * this.multipleBulletSpread;
      // 0.5 is the max and min accuracy angle
      bulletAngle += (Math.random() - 0.5) * 0.5 * (1 - this.accuracy);

      const bulletDirection = angleToVector(bulletAngle);

      const newBullet = new this.BulletClass(x, y, bulletDirection.x, bulletDirection.y);

      bullets.push(newBullet);
    }

    return bullets;
  }

  draw() {
    ctx.drawImage(
      gunPartSheet,
      this.barrel.imgCellX * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      -SPRITE_SIZE / 2,
      -SPRITE_SIZE * 1.4,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }
}

//Right now stats are hard coded, later they will be calculated based on the parts used to make them
export const gun = new Gun();
