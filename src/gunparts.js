import { RubberBullet, ShotgunShell, Bullet, SmallBullet } from "./bullet";
import { Gun } from "./gun";

class Body {
  constructor(BulletClass, BULLETS_AT_ONCE, MULTIPLE_BULLET_SPREAD, imgCellX, showMag = true) {
    this.BulletClass = BulletClass;

    this.BULLETS_AT_ONCE = BULLETS_AT_ONCE; // Int
    this.MULTIPLE_BULLET_SPREAD = MULTIPLE_BULLET_SPREAD; // Radians

    this.imgCellX = imgCellX;
    this.showMag = showMag;
  }
}

class Magazine {
  constructor(IS_AUTOMATIC, RELOAD_TIME, CAPACITY, imgCellX) {
    this.IS_AUTOMATIC = IS_AUTOMATIC; // Bool
    this.RELOAD_TIME = RELOAD_TIME; // Seconds
    this.CAPACITY = CAPACITY; // Int

    this.imgCellX = imgCellX;
  }
}

class Grip {
  constructor(MOBILITY, ACCURACY) {
    this.MOBILITY = MOBILITY;
    this.ACCURACY = ACCURACY;
  }
}

class Action {
  constructor(MOBILITY, FIRE_RATE, POWER) {
    this.MOBILITY = MOBILITY;
    this.FIRE_RATE = FIRE_RATE; // Seconds
    this.POWER = POWER;
  }
}

export const bodys = [
  new Body(ShotgunShell, 2, 0.1, 0, false), // Double Body
  new Body(Bullet, 1, 0, 1, true), // Long range Body
  new Body(SmallBullet, 1, 0, 2, true), // Normal Body
  new Body(SmallBullet, 1, 0, 3, true), // Normal Body but high mobility
  new Body(Bullet, 1, 0, 4, true), // Pistol Body
  new Body(SmallBullet, 5, 0.05, 5, false), // Machinegun Body

  new Body(RubberBullet, 1, 0, 6, false, 0), // Rubbergun Body
];

export const magazines = [new Magazine(false, 0.5, 16, 0), new Magazine(true, 1, 20, 1), new Magazine(true, 2, 40, 2), new Magazine(false, 0.9, 6, 3)];

export const grips = [new Grip(0.2, 0.8), new Grip(0.4, 0.6), new Grip(0.6, 0.4), new Grip(0.8, 0.2)];
export const actions = [new Action(0.2, 0.05, 0.1), new Action(0.4, 0.1, 0.5), new Action(0.9, 0.2, 0.5), new Action(0.4, 0, 1)];
