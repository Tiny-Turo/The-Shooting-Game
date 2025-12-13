import { Bullet, ShotgunShell, SniperBullet } from "./bullettypes";

class Body {
  static nextImageIndex = 0;

  constructor(BulletClass, bulletsAtOnce, multipleBulletSpread, isAutomatic = true, canModMag = true, canModStock = true) {
    Object.assign(this, { BulletClass, bulletsAtOnce, multipleBulletSpread, isAutomatic, canModMag, canModStock });

    this.imageIndex = Body.nextImageIndex++;
  }
}

class Magazine {
  static nextImageIndex = 0;

  constructor(reloadTime, capacity, fireRate) {
    Object.assign(this, { reloadTime, capacity, fireRate });

    this.imageIndex = Magazine.nextImageIndex++;
  }
}

class Grip {
  static nextImageIndex = 0;

  constructor(mobility, accuracy) {
    Object.assign(this, { mobility, accuracy });

    this.imageIndex = Grip.nextImageIndex++;
  }
}

class Stock {
  static nextImageIndex = 0;

  constructor(mobility, accuracy, power) {
    Object.assign(this, { mobility, accuracy, power });

    this.imageIndex = Stock.nextImageIndex++;
  }
}

export let gunParts = {
  body: [
    new Body(Bullet, 1, 0, false, false, false),
    new Body(Bullet, 1, 0, false, false, false),
    new Body(SniperBullet, 1, 0, false),
    new Body(Bullet, 5, 0.1, true, true, false),
    new Body(ShotgunShell, 2, 0.1),
  ],
  magazine: [new Magazine(1, 20, 0.2)],
  grip: [new Grip(0.2, 1), new Grip(0.4, 0.8), new Grip(0.6, 0.6), new Grip(0.8, 0.4), new Grip(1, 0.2)],
  stock: [new Stock(0.2, 0.8, 1), new Stock(0.6, 1, 0.4), new Stock(1, 0.5, 0.5)],
};
