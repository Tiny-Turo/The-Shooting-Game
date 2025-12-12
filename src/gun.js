import { SmallBullet } from "./bullettypes"; //Temp

export class Gun {
  constructor(body, magazine, grip, action) {
    this.calculateStats(body, magazine, grip, action);

    this.isReloading = false;
    this.lastShot = 0;

    this.shootNoise = new Howl({ src: ["/temp/submachine-gun-79846.mp3"], loop: false, volume: 1 });
  }

  calculateStats(body, magazine, grip, action) {
    // this.bulletsLeft = magazine.capacity;
    this.bulletsLeft = 10;

    this.body = body;
    this.magazine = magazine;
    this.grip = grip;
    this.action = action;

    this.mobility = 1;

    this.fireRate = 0.1;
    this.accuracy = 0.9;
    this.power = 1;

    this.reloadTime = 1;
    this.magCapacity = 10;
    this.bulletsAtOnce = 1;
    this.multipleBulletSpread = 0;

    this.BulletClass = SmallBullet;
  }

  shoot(x, y, angle) {
    //If has no bullets left, is reloading, or fire rate has not passed yet - return
    if (this.bulletsLeft <= 0 || this.isReloading || (time.time - this.lastShot < this.fireRate && this.fireRate > 0)) return;
    this.shootNoise.play();
    //Set lastShot
    this.lastShot = time.time;

    let newBullets = [];

    for (let i = 0; i < this.bulletsAtOnce; i++) {
      //Calculate bullet angle, taking into consideration spread if there is more than one bullet
      let bulletAngle = angle - (this.bulletsAtOnce * this.multipleBulletSpread) / 2 + (i + 0.5) * this.multipleBulletSpread;

      // 0.25 is the max and min accuracy angle
      bulletAngle += (Math.random() - 0.5) * 0.25 * (1 - this.accuracy);
      //Calculate the direction
      const bulletDirection = angleToVector(bulletAngle);
      const newBullet = new this.BulletClass(x, y, bulletDirection.x, bulletDirection.y, this.power);
      newBullets.push(newBullet);
    }

    pushBullets(newBullets);

    this.bulletsLeft -= 1; //Even if it shoots multiple bullets at once, count it as one round
    if (this.bulletsLeft <= 0) {
      this.reload(); // Automatically reload if there are no bullets left
    }
  }

  reload() {
    //Will not reload if is already reloading or mag is full
    if (this.isReloading || this.bulletsLeft == this.magCapacity) return;
    //Set isReloading
    this.isReloading = true;

    setTimeout(() => {
      this.bulletsLeft = this.magCapacity;
      this.isReloading = false;
    }, this.reloadTime * 1000);
  }

  draw() {
    //Mag

    ctx.fillStyle = "red";
    ctx.fillRect(-10, -100, 20, 100);

    // //Body
    // ctx.drawImage(
    //   barrelSheet,
    //   this.body.imgCellX * SPRITE_SIZE,
    //   0,
    //   SPRITE_SIZE,
    //   SPRITE_SIZE * 2,
    //   -SPRITE_SIZE / 2,
    //   -SPRITE_SIZE * 2.45,
    //   SPRITE_SIZE,
    //   SPRITE_SIZE * 2
    // );
  }
}

export let gun = new Gun();
