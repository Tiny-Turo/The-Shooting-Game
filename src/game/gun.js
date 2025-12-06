class Gun {
  constructor() {
    this.mobility = 0.4;
    this.recoil = 0;

    //If fireRate = 0, gun will not continue shooting when held down, useful for pistols
    this.fireRate = 0.1;
    this.accuracy = 0;

    this.reloadTime = 0.3;
    this.magCapacity = 20;
    this.bulletsAtOnce = 0;
  }
}

//Right now stats are hard coded, later they will be calculated based on the parts used to make them
export const gun = new Gun();
