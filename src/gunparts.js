import { RubberBullet, ShotgunShell, Bullet, SmallBullet } from "./bullet";

class Barrel {
  constructor(MOBILITY, BULLETS_AT_ONCE, MULTIPLE_BULLET_SPREAD, imgCellX, SHOW_MAG = true) {
    this.MOBILITY = MOBILITY;
    this.BULLETS_AT_ONCE = BULLETS_AT_ONCE; // Int
    this.MULTIPLE_BULLET_SPREAD = MULTIPLE_BULLET_SPREAD; // Radians

    this.imgCellX = imgCellX;
    this.SHOW_MAG = SHOW_MAG;
  }
}

class Magazine {
  constructor(IS_AUTOMATIC, RELOAD_TIME, CAPACITY, BULLET_CLASS, imgCellX) {
    this.IS_AUTOMATIC = IS_AUTOMATIC; // Bool
    this.RELOAD_TIME = RELOAD_TIME; // Seconds
    this.CAPACITY = CAPACITY; // Int
    this.BULLET_CLASS = BULLET_CLASS;

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

// export const barrel = new Barrel(0.5, 2, 0.1, 0, false); // Double barrel
// export const barrel = new Barrel(0.1, 1, 0, 1, true); // Long range barrel
// export const barrel = new Barrel(0.5, 1, 0, 2, true); // Normal barrel
// export const barrel = new Barrel(0.7, 1, 0, 3, true); // Normal barrel but high mobility
export const barrel = new Barrel(1, 1, 0, 4, true); // Pistol barrel
// export const barrel = new Barrel(0.2, 5, 0.05, 5, false); // Machinegun barrel

// export const magazine = new Magazine(false, 0.5, 16, ShotgunShell, 0);
// export const magazine = new Magazine(true, 1, 20, SmallBullet, 1);
// export const magazine = new Magazine(true, 2, 40, SmallBullet, 2);
export const magazine = new Magazine(false, 0.9, 6, Bullet, 3);

export const grip = new Grip(0.2, 0.8);
// export const grip = new Grip(0.4, 0.6);
// export const grip = new Grip(0.6, 0.4);
// export const grip = new Grip(0.8, 0.2);

// export const body = new Body(0.2, 0.05);
// export const body = new Body(0.4, 0.1);
export const body = new Body(0.9, 0.2);
