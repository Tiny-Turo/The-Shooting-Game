import { BallBullet, Bullet, Grenade, RubberBullet, ShotgunShell, SniperBullet } from "./bullettypes";
window.MAX_STAT_VALUE = 24;
class Body {
  static nextImageIndex = 0;

  constructor({
    gunSound,
    spriteLength, // On figma sprite

    BulletClass,

    mobility,
    accuracy,
    power,

    fireRate,
    isAutomatic = true,

    bulletsAtOnce = 1,
    multipleBulletSpread = 0,
    multipleBulletSplit = 0,

    canModStock = true,
    canModMag = true,

    reloadTime = undefined,
    magCapacity = undefined,
  }) {
    //Each body has base mobility and power
    Object.assign(this, {
      gunSound,
      spriteLength,

      BulletClass,

      mobility,
      accuracy,
      power,

      fireRate,
      isAutomatic,

      bulletsAtOnce,
      multipleBulletSpread,
      multipleBulletSplit,

      canModStock,
      canModMag,

      reloadTime,
      magCapacity,
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
      gunSound: "pistol",
      spriteLength: 23,
      BulletClass: Bullet,
      mobility: 11,
      accuracy: 11,
      power: 11,
      fireRate: 3, // OR 0
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
      reloadTime: 0.5,
      magCapacity: 6,
    }),

    new Body({
      gunSound: "sniper",
      spriteLength: 49,
      BulletClass: SniperBullet,
      mobility: 1,
      accuracy: 20,
      power: 18,
      fireRate: 1,
      isAutomatic: false,
    }),

    new Body({
      gunSound: "shotgun",
      spriteLength: 39,
      BulletClass: ShotgunShell,
      mobility: 8,
      accuracy: 11,
      power: 16,
      fireRate: 1,
      isAutomatic: false,
      bulletsAtOnce: 2,
      multipleBulletSpread: 0.05,
      multipleBulletSplit: 10,
      canModMag: false,
      reloadTime: 1,
      magCapacity: 1,
    }),

    new Body({
      gunSound: "launcher",
      spriteLength: 36,
      BulletClass: Grenade,
      mobility: 6,
      accuracy: 8,
      power: 5,
      fireRate: 5,
      canModStock: false,
    }),

    new Body({
      gunSound: "revolver",
      spriteLength: 18,
      BulletClass: BallBullet,
      mobility: 12,
      accuracy: 10,
      power: 12,
      fireRate: 2,
      isAutomatic: false,
      canModStock: false,
      canModMag: false,
      reloadTime: 1.5,
      magCapacity: 8,
    }),

    new Body({
      gunSound: "AR",
      spriteLength: 51,
      BulletClass: Bullet,
      mobility: 10,
      accuracy: 10,
      power: 8,
      fireRate: 10,
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
