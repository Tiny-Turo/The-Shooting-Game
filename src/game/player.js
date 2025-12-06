const playerConfig = {
  maxSpeed: 4000, // Acceleration
  maxRecoil: 2000,
  friction: 10,

  radius: 50,

  image: new Image(),
};
playerConfig.image.src = "/temp/player.png";

class Player {
  constructor(x, y) {
    //Position stuff
    this.x = x;
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.angle = 0;

    //Gun stuff
    this.gun = {};
    this.isReloading = false;
    this.bulletsLeft = 0;
    this.lastShot = 0;

    this.bullets = [];

    addEventListener("mousedown", (e) => {
      this.shoot();
    });

    addEventListener("keydown", (e) => {
      if (e.code == "KeyR") this.reload();
    });
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = "#ED6A5A";
    // ctx.beginPath();
    // ctx.arc(0, 0, playerConfig.radius, 0, 2 * Math.PI);
    // ctx.rect(-playerConfig.radius / 4, -playerConfig.radius * 2, playerConfig.radius / 2, playerConfig.radius * 2);

    // ctx.fill();

    ctx.drawImage(playerConfig.image, -SPRITE_SIZE / 2, -SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE);

    ctx.restore();
  }

  giveGun(gun) {
    this.gun = gun;
    this.bulletsLeft = this.gun.magCapacity;
  }

  shoot() {
    //Will not shoot if has no bullets or is reloading
    //Or if player is trying to spam click faster than a machine gun
    if (this.bulletsLeft <= 0 || this.isReloading || (time.time - this.lastShot < this.gun.fireRate && this.gun.fireRate > 0)) return;
    this.bulletsLeft--;

    this.gun.shootNoise.play();
    this.lastShot = time.time;

    const bulletDirection = normalize({ x: mouse.x - this.x, y: mouse.y - this.y });
    this.bullets.push(new this.gun.BulletClass(this.x, this.y, bulletDirection.x, bulletDirection.y));

    //If bullets are finished - reload automatically
    if (this.bulletsLeft <= 0) {
      this.reload();
    }
  }

  reload() {
    //Will not reload if is already reloading or mag is full
    if (this.isReloading || this.bulletsLeft == this.gun.magCapacity) return;
    this.isReloading = true;

    setTimeout(() => {
      this.bulletsLeft = this.gun.magCapacity;
      this.isReloading = false;
    }, this.gun.reloadTime * 1000);
  }

  update() {
    if (this.isReloading) console.log("Wow!");
    //Check if player shoots
    if (mouse.isDown) {
      if (time.time - this.lastShot > this.gun.fireRate && this.gun.fireRate > 0) {
        this.shoot();
      }
    }

    //Update the players bullets
    for (const bullet of this.bullets) {
      bullet.update();
    }

    let dir = { x: 0, y: 0 };
    if (keysDown["KeyW"]) dir.y--;
    if (keysDown["KeyS"]) dir.y++;
    if (keysDown["KeyA"]) dir.x--;
    if (keysDown["KeyD"]) dir.x++;

    dir = normalize(dir);

    // Acceleration is multiplied by gun mobility
    let acceleration = playerConfig.maxSpeed * this.gun.mobility;

    this.velocity.x += dir.x * acceleration * time.deltaTime;
    this.velocity.y += dir.y * acceleration * time.deltaTime;

    //Friction
    const frictionBlend = Math.pow(0.5, time.deltaTime * playerConfig.friction);
    this.velocity.x = lerp(0, this.velocity.x, frictionBlend);
    this.velocity.y = lerp(0, this.velocity.y, frictionBlend);

    //Movement
    this.x += this.velocity.x * time.deltaTime;
    this.y += this.velocity.y * time.deltaTime;

    this.angle = angleTo(this, mouse);

    this.draw();
  }
}

export let userPlayer = new Player(canvas.width / 2, canvas.height / 2);
