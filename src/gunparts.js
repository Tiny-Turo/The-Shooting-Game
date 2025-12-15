import { BallBullet, Bullet, RubberBullet, ShotgunShell, SniperBullet } from "./bullettypes";
window.MAX_STAT_VALUE = 24;
class Body {
  static nextImageIndex = 0;

  constructor({
    spriteLength = 200, // On figma sprite
    BulletClass,
    mobility,
    accuracy,
    power,
    fireRate,
    bulletsAtOnce = 1,
    multipleBulletSpread = 0,
    multipleBulletSplit = 0,
    canModStock = true,
    canModMag = true,
  }) {
    //Each body has base mobility and power
    Object.assign(this, {
      spriteLength,
      BulletClass,
      mobility,
      accuracy,
      power,
      fireRate,
      bulletsAtOnce,
      multipleBulletSpread,
      multipleBulletSplit,
      canModStock,
      canModMag,
    });

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

  constructor({ reloadTime, capacity, power, mobility }) {
    Object.assign(this, { reloadTime, capacity, power, mobility });

    this.imageIndex = Magazine.nextImageIndex++;
  }
}

export const gunParts = {
  body: [
    new Body({
      spriteLength: 23,
      BulletClass: Bullet,
      mobility: 11,
      accuracy: 11,
      power: 11,
      fireRate: 0,
      canModStock: false,
      canModMag: false,
    }),

    new Body({
      spriteLength: 49,
      BulletClass: SniperBullet,
      mobility: 2,
      accuracy: 20,
      power: 18,
      fireRate: 0,
    }),

    new Body({
      spriteLength: 39,
      BulletClass: ShotgunShell,
      mobility: 8,
      accuracy: 11,
      power: 16,
      fireRate: 0,
      bulletsAtOnce: 2,
      multipleBulletSpread: 0.05,
      multipleBulletSplit: 10,
      canModStock: true,
      canModMag: false,
    }),

    new Body({
      spriteLength: 36,
      BulletClass: RubberBullet,
      mobility: 6,
      accuracy: 8,
      power: 5,
      fireRate: 0.2,
      canModStock: false,
      canModMag: true,
    }),

    new Body({
      spriteLength: 18,
      BulletClass: BallBullet,
      mobility: 12,
      accuracy: 10,
      power: 12,
      fireRate: 0,
      canModStock: false,
      canModMag: false,
    }),

    new Body({
      spriteLength: 51,
      BulletClass: Bullet,
      mobility: 10,
      accuracy: 10,
      power: 8,
      fireRate: 12,
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
    new Magazine({ reloadTime: 1, capacity: 42, power: -3, mobility: -2 }),
    new Magazine({ reloadTime: 0.5, capacity: 16, power: 0, mobility: 3 }),
    new Magazine({ reloadTime: 1.5, capacity: 24, power: -2, mobility: 1 }),
  ],
};
