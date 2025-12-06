let bulletSheet = new Image();
bulletSheet.src = "/temp/bullet.png";

export class RubberBullet {
  constructor(x, y, dirX, dirY) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;

    this.speed = 1000;

    this.imgCellX = 0;

    this.spawn();
  }

  draw() {
    ctx.drawImage(
      bulletSheet,
      this.imgCellX * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.x - SPRITE_SIZE / 2,
      this.y - SPRITE_SIZE / 2,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }

  spawn() {
    console.log("Hi!");
  }

  update() {
    this.x += this.dirX * this.speed * time.deltaTime;
    this.y += this.dirY * this.speed * time.deltaTime;

    this.draw();
  }
}
