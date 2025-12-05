class Gun {
  constructor() {
    this.fireRate = 0;
    this.mobility = 0.4;
    this.accuracy = 0;
    this.reloadSpeed = 0;
    this.magCapacity = 0;
    this.bulletsAtOnce = 0;
  }
}

//Right now stats are hard coded, later they will be calculated based on the parts used to make them
export const gun = new Gun();
