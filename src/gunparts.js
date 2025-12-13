import { BallBullet, Bullet, RubberBullet, ShotgunShell, SniperBullet } from "./bullettypes";
window.MAX_STAT_VALUE = 8;
class Body {
  static nextImageIndex = 0;

  constructor({ BulletClass, mobility, power, bulletsAtOnce, multipleBulletSpread, isAutomatic = true, canModStock = true, canModMag = true }) {
    //Each body has base mobility and power
    Object.assign(this, { BulletClass, mobility, power, bulletsAtOnce, multipleBulletSpread, isAutomatic, canModStock, canModMag });

    this.imageIndex = Body.nextImageIndex++;
  }
}

class Grip {
  static nextImageIndex = 0;

  constructor({ mobility, accuracy }) {
    Object.assign(this, { mobility, accuracy });

    this.imageIndex = Grip.nextImageIndex++;
  }
}

class Stock {
  static nextImageIndex = 0;

  constructor({ mobility, accuracy, power }) {
    Object.assign(this, { mobility, accuracy, power });

    this.imageIndex = Stock.nextImageIndex++;
  }
}

class Magazine {
  static nextImageIndex = 0;

  constructor({ reloadTime, capacity, fireRate, power }) {
    Object.assign(this, { reloadTime, capacity, fireRate, power });

    this.imageIndex = Magazine.nextImageIndex++;
  }
}

export const gunParts = {
  body: [
    new Body({
      BulletClass: Bullet,
      mobility: 5,
      power: 4,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
    }),

    new Body({
      BulletClass: Bullet,
      mobility: 4,
      power: 5,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
    }),

    new Body({
      BulletClass: SniperBullet,
      mobility: 2,
      power: 7,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
    }),

    new Body({
      BulletClass: Bullet,
      mobility: 3,
      power: 2,
      bulletsAtOnce: 5,
      multipleBulletSpread: 0.1,
      isAutomatic: true,
      canModStock: false,
      canModMag: true,
    }),

    new Body({
      BulletClass: ShotgunShell,
      mobility: 4,
      power: 7,
      bulletsAtOnce: 2,
      multipleBulletSpread: 0.1,
      isAutomatic: false,
      canModStock: true,
      canModMag: false,
    }),

    new Body({
      BulletClass: RubberBullet,
      mobility: 3,
      power: 3,
      bulletsAtOnce: 0.6,
      multipleBulletSpread: 0,
      isAutomatic: true,
      canModStock: false,
      canModMag: true,
    }),

    new Body({
      BulletClass: BallBullet,
      mobility: 6,
      power: 6,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
    }),
  ],

  grip: [
    new Grip({ mobility: -1, accuracy: 4 }),
    new Grip({ mobility: 0, accuracy: 3 }),
    new Grip({ mobility: 1, accuracy: 2 }),
    new Grip({ mobility: 2, accuracy: 1 }),
    new Grip({ mobility: 3, accuracy: 0 }),
  ],

  stock: [
    new Stock({ mobility: -2, accuracy: 0, power: 5 }),
    new Stock({ mobility: 2, accuracy: 2, power: -2 }),
    new Stock({ mobility: 2, accuracy: 0, power: 1 }),
  ],

  magazine: [
    new Magazine({ reloadTime: 0.5, capacity: 24, fireRate: 0.1, power: -2 }),
    new Magazine({ reloadTime: 2, capacity: 16, fireRate: 0.2, power: 0 }),
    new Magazine({ reloadTime: 1, capacity: 42, fireRate: 0.05, power: -3 }),
  ],
};
