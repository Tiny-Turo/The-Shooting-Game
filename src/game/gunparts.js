import { RubberBullet, ShotgunShell, Bullet } from "./bullet";

class Barrel {
  constructor(mobility, bulletsAtOnce, multipleBulletSpread) {
    this.mobility = mobility;
    this.bulletsAtOnce = bulletsAtOnce; //Int
    this.multipleBulletSpread = multipleBulletSpread; //Angle in radians

    this.imgCellX = 0;
  }
}

class Magazine {
  constructor(isAutomatic, reloadTime, capacity, BulletClass) {
    this.isAutomatic = isAutomatic; //Bool
    this.reloadTime = reloadTime; //Seconds
    this.capacity = capacity; //Int
    this.BulletClass = BulletClass;
  }
}

class Grip {
  constructor(mobility, accuracy) {
    this.mobility = mobility;
    this.accuracy = accuracy;
  }
}

class Body {
  constructor(mobility, fireRate) {
    this.mobility = mobility;
    this.fireRate = fireRate; //Seconds
  }
}

export const barrel = new Barrel(1, 1, 0);
export const magazine = new Magazine(true, 1, 20, RubberBullet);
export const grip = new Grip(1, 0);
export const body = new Body(1, 0.2);
