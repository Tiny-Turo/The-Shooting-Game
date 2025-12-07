import { RubberBullet, ShotgunShell, Bullet, SmallBullet } from "./bullet";

class Barrel {
  constructor(mobility, bulletsAtOnce, multipleBulletSpread, imgCellX, showMag = true) {
    this.mobility = mobility;
    this.bulletsAtOnce = bulletsAtOnce; //Int
    this.multipleBulletSpread = multipleBulletSpread; //Angle in radians

    this.imgCellX = imgCellX;
    this.showMag = showMag;
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
