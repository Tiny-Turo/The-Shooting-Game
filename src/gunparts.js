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
  constructor(isAutomatic, reloadTime, capacity) {
    this.isAutomatic = isAutomatic; // Bool
    this.reloadTime = reloadTime; // Seconds
    this.capacity = capacity; // Int
  }
}

class Grip {
  constructor(mobility, accuracy) {
    this.mobility = mobility;
    this.accuracy = accuracy;
  }
}

class Stock {
  constructor(mobility, accuracy) {
    this.mobility = mobility;
    this.accuracy = accuracy;
  }
}

class Action {
  constructor(mobility, fireRate, power) {
    this.mobility = mobility;
    this.fireRate = fireRate; // Seconds
    this.power = power;
  }
}
