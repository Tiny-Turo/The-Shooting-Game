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
