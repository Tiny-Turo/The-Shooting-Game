import { RubberBullet, ShotgunShell, Bullet, SmallBullet } from "./bullet";

class Barrel {
  constructor(mobility, bulletsAtOnce, multipleBulletSpread, imgCellX) {
    this.mobility = mobility;
    this.bulletsAtOnce = bulletsAtOnce; //Int
    this.multipleBulletSpread = multipleBulletSpread; //Angle in radians

    this.imgCellX = imgCellX;
  }
}

class Magazine {
  constructor(isAutomatic, reloadTime, capacity, BulletClass, imgCellX) {
    this.isAutomatic = isAutomatic; //Bool
    this.reloadTime = reloadTime; //Seconds
    this.capacity = capacity; //Int
    this.BulletClass = BulletClass;

    this.imgCellX = imgCellX;
  }
}

class Grip {
  constructor(mobility, accuracy, imgCellX) {
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

// export const barrel = new Barrel(0.5, 2, 0.1, 0);
// export const magazine = new Magazine(false, 1, 2, ShotgunShell);
// export const grip = new Grip(0.5, 0.8);
// export const body = new Body(0.5, 0);

// export const barrel = new Barrel(0.1, 1, 0, 1);
// export const magazine = new Magazine(false, 2, 1, Bullet);
// export const grip = new Grip(0.1, 1);
// export const body = new Body(0.5, 0);

// export const barrel = new Barrel(0.5, 1, 0, 2);
// export const magazine = new Magazine(true, 2, 12, SmallBullet);
// export const grip = new Grip(0.4, 1);
// export const body = new Body(0.3, 0.2);

// export const barrel = new Barrel(0.3, 1, 0, 3);
// export const magazine = new Magazine(true, 1, 50, SmallBullet);
// export const grip = new Grip(0.3, 0.4);
// export const body = new Body(0.3, 0.05);

// export const barrel = new Barrel(1, 1, 0, 4);
// export const magazine = new Magazine(true, 2, 6, Bullet);
// export const grip = new Grip(1, 0.7);
// export const body = new Body(1, 0.3);
