class Body {
  constructor(BulletClass, bulletsAtOnce, multipleBulletSpread, canModMag = true, canModStock = true) {
    this.BulletClass = BulletClass;

    this.bulletsAtOnce = bulletsAtOnce; // Int
    this.multipleBulletSpread = multipleBulletSpread; // Radians

    this.canModMag = canModMag;
    this.canModStock = canModStock;
  }
}

class Magazine {
  constructor(reloadTime, capacity, fireRate) {
    this.reloadTime = reloadTime; // Seconds
    this.capacity = capacity; // Int
    this.fireRate = fireRate; // Seconds
  }
}

class Grip {
  constructor(mobility, accuracy) {
    this.mobility = mobility;
    this.accuracy = accuracy;
  }
}

class Stock {
  constructor(mobility, accuracy, power) {
    this.mobility = mobility;
    this.accuracy = accuracy;
    this.power = power;
  }
}
