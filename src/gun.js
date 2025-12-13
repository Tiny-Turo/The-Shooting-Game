const bodyTopDown = new Image(); //Temp
bodyTopDown.src = "/temp/body-top-down.png";

const gripImage = new Image(); //Temp
gripImage.src = "/temp/grip.png";

const stockImage = new Image(); //Temp
stockImage.src = "/temp/stock.png";

const bodyImage = new Image(); //Temp
bodyImage.src = "/temp/body-side.png";

export class Gun {
  constructor(body, grip, stock, magazine) {
    Object.assign(this, { body, grip, stock, magazine });
    this.calculateStats();

    this.isReloading = false;
    this.lastShot = 0;

    this.shootNoise = new Howl({
      src: ["/temp/submachine-gun-79846.mp3"],
      loop: false,
      volume: 1,
    });
  }

  calculateStats() {
    this.mobility = (this.grip.mobility + this.stock.mobility + this.body.mobility) / 3;

    this.accuracy = (this.grip.accuracy + this.stock.accuracy) / 2;

    this.fireRate = this.magazine.fireRate * this.body.isAutomatic;
    this.power = (this.stock.power + this.magazine.power) / 2;

    this.reloadTime = this.magazine.reloadTime;
    this.magCapacity = this.magazine.capacity;
    this.bulletsAtOnce = this.body.bulletsAtOnce;
    this.multipleBulletSpread = this.body.multipleBulletSpread;

    this.BulletClass = this.body.BulletClass;

    this.bulletsLeft = this.magCapacity;
  }

  shoot(x, y, angle) {
    //If has no bullets left, is reloading, or fire rate has not passed yet - return
    if (this.bulletsLeft <= 0 || this.isReloading || time.time - this.lastShot < this.fireRate) return;
    this.shootNoise.play();
    //Set lastShot
    this.lastShot = time.time;

    for (let i = 0; i < this.bulletsAtOnce; i++) {
      //Calculate bullet angle, taking into consideration spread if there is more than one bullet
      let bulletAngle = angle - (this.bulletsAtOnce * this.multipleBulletSpread) / 2 + (i + 0.5) * this.multipleBulletSpread;

      // 0.25 is the max and min accuracy angle
      bulletAngle += (Math.random() - 0.5) * 0.25 * (1 - this.accuracy);
      //Calculate the direction
      const bulletDirection = angleToVector(bulletAngle);
      const newBullet = new this.BulletClass(x, y, bulletDirection.x, bulletDirection.y, this.power);
      pushBullet(newBullet);
    }

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
    //Body
    const imageIndex = this.body.imageIndex;
    ctx.drawImage(bodyTopDown, imageIndex * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE * 2, -SPRITE_SIZE / 2, -SPRITE_SIZE * 2.45, SPRITE_SIZE, SPRITE_SIZE * 2);
  }

  drawPart(image, index) {
    ctx.drawImage(
      image,
      0,
      index * SPRITE_SIZE * 2, //Each one is Sprite Size * 2 tall and * 8 tall
      SPRITE_SIZE * 8,
      SPRITE_SIZE * 2,
      -SPRITE_SIZE * 4,
      -SPRITE_SIZE,
      SPRITE_SIZE * 8,
      SPRITE_SIZE * 2
    );
  }

  drawSide() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    this.drawPart(bodyImage, this.body.imageIndex);
    this.drawPart(gripImage, this.grip.imageIndex);

    this.drawPart(stockImage, this.stock.imageIndex);
    // console.log(this.stock.imageIndex);

    ctx.restore();
  }
}

export let gun;

export function setGun(body, grip, stock, magazine) {
  gun = new Gun(body, grip, stock, magazine);
}
