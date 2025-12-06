import { RubberBullet } from "./bullet";

class Gun {
  constructor() {
    this.mobility = 0.2;
    this.recoil = 0;

    //If fireRate = 0, gun will not continue shooting when held down, useful for pistols
    this.fireRate = 0.1;
    this.accuracy = 0;

    this.reloadTime = 2;
    this.magCapacity = 20;
    this.bulletsAtOnce = 0;

    this.BulletClass = RubberBullet;

    this.shootNoise = new Howl({ src: ["/temp/low-pop-368761.mp3"], loop: false, volume: 1 });
  }
}

//Right now stats are hard coded, later they will be calculated based on the parts used to make them
export const gun = new Gun();
