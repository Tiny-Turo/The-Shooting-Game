import { BallBullet, Bullet, RubberBullet, ShotgunShell, SniperBullet } from "./bullettypes";
window.MAX_STAT_VALUE = 24;
class Body {
  static nextImageIndex = 0;

  constructor({ BulletClass, mobility, accuracy, power, bulletsAtOnce, multipleBulletSpread, isAutomatic = true, canModStock = true, canModMag = true }) {
    //Each body has base mobility and power
    Object.assign(this, { BulletClass, mobility, accuracy, power, bulletsAtOnce, multipleBulletSpread, isAutomatic, canModStock, canModMag });

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
      mobility: 11,
      accuracy: 11,
      power: 11,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
    }),

    new Body({
      BulletClass: Bullet,
      mobility: 10,
      accuracy: 11,
      power: 12,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
    }),

    new Body({
      BulletClass: SniperBullet,
      mobility: 2,
      accuracy: 20,
      power: 18,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
    }),

    new Body({
      BulletClass: Bullet,
      mobility: 4,
      accuracy: 5,
      power: 1,
      bulletsAtOnce: 3,
      multipleBulletSpread: 0.05,
      isAutomatic: true,
      canModStock: false,
      canModMag: true,
    }),

    new Body({
      BulletClass: ShotgunShell,
      mobility: 8,
      accuracy: 11,
      power: 16,
      bulletsAtOnce: 2,
      multipleBulletSpread: 0.1,
      isAutomatic: false,
      canModStock: true,
      canModMag: false,
    }),

    new Body({
      BulletClass: RubberBullet,
      mobility: 6,
      accuracy: 8,
      power: 5,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: true,
      canModStock: false,
      canModMag: true,
    }),

    new Body({
      BulletClass: BallBullet,
      mobility: 12,
      accuracy: 10,
      power: 12,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
    }),

    new Body({
      BulletClass: Bullet,
      mobility: 10,
      accuracy: 10,
      power: 8,
      bulletsAtOnce: 1,
      multipleBulletSpread: 0,
      isAutomatic: true,
      canModStock: true,
      canModMag: true,
    }),
  ],

  grip: [
    new Grip({ mobility: 0, accuracy: 7 }),
    new Grip({ mobility: 1, accuracy: 6 }),
    new Grip({ mobility: 2, accuracy: 5 }),
    new Grip({ mobility: 3, accuracy: 4 }),
    new Grip({ mobility: 4, accuracy: 3 }),
  ],

  stock: [
    new Stock({ mobility: -1, accuracy: 1, power: 2 }),
    new Stock({ mobility: 0, accuracy: 2, power: 0 }),
    new Stock({ mobility: 1, accuracy: 0, power: 1 }),
  ],

  magazine: [
    new Magazine({ reloadTime: 1, capacity: 42, fireRate: 0.05, power: -3 }),
    new Magazine({ reloadTime: 0.5, capacity: 16, fireRate: 0.2, power: 0 }),
    new Magazine({ reloadTime: 1.5, capacity: 24, fireRate: 0.1, power: -2 }),
  ],
};
