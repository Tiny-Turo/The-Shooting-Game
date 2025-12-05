const playerConfig = {
  speed: 6400, // Acceleration
  friction: 10,

  radius: 50,
};

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.angle = 0;

    this.gun = {};
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = "#ED6A5A";
    ctx.beginPath();
    ctx.arc(0, 0, playerConfig.radius, 0, 2 * Math.PI);
    ctx.rect(-playerConfig.radius / 4, -playerConfig.radius * 2, playerConfig.radius / 2, playerConfig.radius * 2);
    ctx.fill();

    ctx.restore();
  }

  giveGun(gun) {
    this.gun = gun;
  }

  update() {
    let dir = { x: 0, y: 0 };
    if (keysDown["KeyW"]) dir.y--;
    if (keysDown["KeyS"]) dir.y++;
    if (keysDown["KeyA"]) dir.x--;
    if (keysDown["KeyD"]) dir.x++;

    dir = normalize(dir);

    // Acceleration is multiplied by gun mobility
    this.velocity.x += dir.x * playerConfig.speed * this.gun.mobility * time.deltaTime;
    this.velocity.y += dir.y * playerConfig.speed * this.gun.mobility * time.deltaTime;

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
