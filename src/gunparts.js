import { Bullet, ShotgunShell, SniperBullet } from "./bullettypes";

class Body {
  constructor(BulletClass, bulletsAtOnce, multipleBulletSpread, isAutomatic = true, canModMag = true, canModStock = true) {
    this.BulletClass = BulletClass;

    this.bulletsAtOnce = bulletsAtOnce; // Int
    this.multipleBulletSpread = multipleBulletSpread; // Radians
    this.isAutomatic = isAutomatic;

    this.canModMag = canModMag;
    this.canModStock = canModStock;
  }
}

export let bodys = [
  new Body(Bullet, 1, 0, false, false, false),
  new Body(Bullet, 1, 0, false, false, false),
  new Body(SniperBullet, 1, 0, false),
  new Body(Bullet, 5, 0.1),
  new Body(ShotgunShell, 2, 0.1),
]
  //Give each of them a imageIndex
  .map((part, index) => {
    part.imageIndex = index;
    return part;
  });

class Magazine {
  constructor(reloadTime, capacity, fireRate) {
    this.reloadTime = reloadTime; // Seconds
    this.capacity = capacity; // Int
    this.fireRate = fireRate; // Seconds
  }
}

export let magazines = [new Magazine(1, 20, 0.2)]
  //Give each of them a imageIndex
  .map((part, index) => {
    part.imageIndex = index;
    return part;
  });

class Grip {
  constructor(mobility, accuracy) {
    this.mobility = mobility;
    this.accuracy = accuracy;
  }
}

// These are all for the whole game
export let grips = [new Grip(0.2, 1), new Grip(0.4, 0.8), new Grip(0.6, 0.6), new Grip(0.8, 0.4), new Grip(1, 0.2)]
  //Give each of them a imageIndex
  .map((part, index) => {
    part.imageIndex = index;
    return part;
  });

class Stock {
  constructor(mobility, accuracy, power) {
    this.mobility = mobility;
    this.accuracy = accuracy;
    this.power = power;
  }
}

export let stocks = [new Stock(0.2, 0.8, 1), new Stock(0.6, 1, 0.4), new Stock(1, 0.5, 0.5)]
  //Give each of them a imageIndex
  .map((part, index) => {
    part.imageIndex = index;
    return part;
  });
