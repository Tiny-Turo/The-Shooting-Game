import { RubberBullet, ShotgunShell, Bullet, SmallBullet } from "./bullet";
import { Gun } from "./gun";

class Barrel {
  constructor(MOBILITY, BULLETS_AT_ONCE, MULTIPLE_BULLET_SPREAD, imgCellX, showMag = true) {
    this.MOBILITY = MOBILITY;
    this.BULLETS_AT_ONCE = BULLETS_AT_ONCE; // Int
    this.MULTIPLE_BULLET_SPREAD = MULTIPLE_BULLET_SPREAD; // Radians

    this.imgCellX = imgCellX;
    this.showMag = showMag;
  }
}

class Magazine {
  constructor(IS_AUTOMATIC, RELOAD_TIME, CAPACITY, BulletClass, imgCellX) {
    this.IS_AUTOMATIC = IS_AUTOMATIC; // Bool
    this.RELOAD_TIME = RELOAD_TIME; // Seconds
    this.CAPACITY = CAPACITY; // Int
    this.BulletClass = BulletClass;

    this.imgCellX = imgCellX;
  }
}

class Grip {
  constructor(MOBILITY, ACCURACY) {
    this.MOBILITY = MOBILITY;
    this.ACCURACY = ACCURACY;
  }
}

class Body {
  constructor(MOBILITY, FIRE_RATE) {
    this.MOBILITY = MOBILITY;
    this.FIRE_RATE = FIRE_RATE; // Seconds
  }
}

export const barrels = [
  new Barrel(0.5, 2, 0.1, 0, false), // Double barrel
  new Barrel(0.1, 1, 0, 1, true), // Long range barrel
  new Barrel(0.5, 1, 0, 2, true), // Normal barrel
  new Barrel(0.7, 1, 0, 3, true), // Normal barrel but high mobility
  new Barrel(1, 1, 0, 4, true), // Pistol barrel
  new Barrel(0.2, 5, 0.05, 5, false), // Machinegun barrel

  new Barrel(0.2, 1, 0, 6, false, 0), // Rubbergun barrel
];

export const magazines = [
  new Magazine(false, 0.5, 16, ShotgunShell, 0),
  new Magazine(true, 1, 20, SmallBullet, 1),
  new Magazine(true, 2, 40, SmallBullet, 2),
  new Magazine(false, 0.9, 6, Bullet, 3),

  new Magazine(true, 0.9, 18, RubberBullet, 3),
];

export const grips = [new Grip(0.2, 0.8), new Grip(0.4, 0.6), new Grip(0.6, 0.4), new Grip(0.8, 0.2)];
export const bodys = [new Body(0.2, 0.05), new Body(0.4, 0.1), new Body(0.9, 0.2)];
