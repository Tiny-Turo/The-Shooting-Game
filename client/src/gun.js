import { BulletClassMap } from "./bullettypes";
import { shotToServer } from "./game/connections";

const bodyTopDown = new Image(); //Temp
bodyTopDown.src = "/sprites/body-top-down.png";

const gripImage = new Image(); //Temp
gripImage.src = "/sprites/grip.png";

const stockImage = new Image(); //Temp
stockImage.src = "/sprites/stock.png";

const magImage = new Image(); //Temp
magImage.src = "/sprites/mag.png";

const bodyImage = new Image(); //Temp
bodyImage.src = "/sprites/body-side.png";

export function drawGun(imageIndex) {
  ctx.drawImage(bodyTopDown, imageIndex * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE * 2, -SPRITE_SIZE / 2, -SPRITE_SIZE * 2.45, SPRITE_SIZE, SPRITE_SIZE * 2);
}

export function shotFired(
  { x, y, angle, BulletClassName, gunSound, bulletsAtOnce, multipleBulletSpread, multipleBulletSplit, accuracy, spriteLength, power, random },
  fromUserPlayer = true
) {
  if (fromUserPlayer)
    shotToServer({
      x,
      y,
      angle,
      BulletClassName,
      gunSound,
      bulletsAtOnce,
      multipleBulletSpread,
      multipleBulletSplit,
      accuracy,
      spriteLength,
      power,
      random,
    });
  //If has no bullets left, is reloading, or fire rate has not passed yet - return
  new Howl({ src: [`/temp/sfx/${gunSound}.wav`] }).play;

  for (let i = 0; i < bulletsAtOnce; i++) {
    //Calculate bullet angle, taking into consideration spread if there is more than one bullet
    let bulletAngle = angle - (bulletsAtOnce * multipleBulletSpread) / 2 + (i + 0.5) * multipleBulletSpread;

    // 0.1 is the max and min accuracy angle
    const accuracyMaxAngle = 0.1;
    bulletAngle += (random - 0.5) * accuracyMaxAngle * (1 - accuracy / MAX_STAT_VALUE);
    //Calculate the direction
    const bulletDirection = angleToVector(bulletAngle);

    let spawnX = x + Math.sin(angle) * ((spriteLength / 64) * 200 + SPRITE_SIZE * 0.45);
    let spawnY = y - Math.cos(angle) * ((spriteLength / 64) * 200 + SPRITE_SIZE * 0.45);

    const offsetSpawn = -(bulletsAtOnce * multipleBulletSplit) / 2 + (i + 0.5) * multipleBulletSplit;

    spawnX += Math.cos(angle) * offsetSpawn;
    spawnY += Math.sin(angle) * offsetSpawn;

    const newBullet = new BulletClassMap[BulletClassName](spawnX, spawnY, bulletDirection.x, bulletDirection.y, power);
    pushBullet(newBullet);
  }
}

export class Gun {
  constructor(body, grip, stock, magazine) {
    if (!body.canModStock) stock = undefined;
    if (!body.canModMag) magazine = undefined;
    Object.assign(this, { body, grip, stock, magazine });

    this.calculateStats();

    this.isReloading = false;
    this.lastShot = 0;
  }

  calculateStats() {
    this.mobility = clamp(this.body.mobility + this.grip.mobility + (this.stock?.mobility ?? 0) + (this.magazine?.mobility ?? 0), 1, MAX_STAT_VALUE);
    this.accuracy = clamp(this.body.accuracy + this.grip.accuracy + (this.stock?.accuracy ?? 0), 1, MAX_STAT_VALUE);
    this.power = clamp(this.body.power + (this.stock?.power ?? 0) + (this.magazine?.power ?? 0), 1, MAX_STAT_VALUE);
    this.fireRate = clamp(this.body.fireRate, 1, MAX_STAT_VALUE);

    // this.mobility = clamp(this.body.mobility, 1, MAX_STAT_VALUE);
    // this.accuracy = clamp(this.body.accuracy, 1, MAX_STAT_VALUE);
    // this.power = clamp(this.body.power, 1, MAX_STAT_VALUE);

    this.reloadTime = this.magazine?.reloadTime ?? this.body.reloadTime;

    this.magCapacity = this.magazine?.capacity ?? this.body.magCapacity;
    this.bulletsAtOnce = this.body.bulletsAtOnce;
    this.multipleBulletSpread = this.body.multipleBulletSpread;
    this.multipleBulletSplit = this.body.multipleBulletSplit;

    this.BulletClassName = this.body.BulletClassName;

    this.bulletsLeft = this.magCapacity;
  }

  shoot(x, y, angle) {
    if (this.bulletsLeft <= 0 || this.isReloading || time.time - this.lastShot < 60 / (this.fireRate * 50)) return;
    this.lastShot = time.time;
    shotFired({
      x: x,
      y: y,
      angle: angle,
      BulletClassName: this.BulletClassName,
      shootNoise: this.body.gunSound,
      bulletsAtOnce: this.bulletsAtOnce,
      multipleBulletSpread: this.multipleBulletSpread,
      multipleBulletSplit: this.multipleBulletSplit,
      accuracy: this.accuracy,
      spriteLength: this.body.spriteLength,
      power: this.power,
      random: Math.random(),
    });
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
    drawGun(this.body.imageIndex);
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

    if (this.body.canModStock) this.drawPart(stockImage, this.stock.imageIndex);
    if (this.body.canModMag) this.drawPart(magImage, this.magazine.imageIndex);

    ctx.restore();
  }
}

export let gun;

export function setGun(body, grip, stock, magazine) {
  gun = new Gun(body, grip, stock, magazine);
}
