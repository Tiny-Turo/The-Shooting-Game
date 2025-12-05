const playerConfig = {
  //Movement
  acceleration: 6400,
  friction: 10,

  radius: 50,
};

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.angle = 0;

    this.keysDown = {};

    addEventListener("keydown", (e) => {
      this.keysDown[e.code] = true;
    });
    addEventListener("keyup", (e) => {
      this.keysDown[e.code] = false;
    });
  }

  draw() {
    ctx.fillStyle = "#ED6A5A";
    ctx.beginPath();
    ctx.arc(this.x, this.y, playerConfig.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    let dir = { x: 0, y: 0 };
    if (this.keysDown["KeyW"]) dir.y--;
    if (this.keysDown["KeyS"]) dir.y++;
    if (this.keysDown["KeyA"]) dir.x--;
    if (this.keysDown["KeyD"]) dir.x++;

    dir = normalize(dir);

    //Acceleration
    this.velocity.x += dir.x * playerConfig.acceleration * time.deltaTime;
    this.velocity.y += dir.y * playerConfig.acceleration * time.deltaTime;

    //Friction
    const frictionBlend = Math.pow(0.5, time.deltaTime * playerConfig.friction);
    this.velocity.x = lerp(0, this.velocity.x, frictionBlend);
    this.velocity.y = lerp(0, this.velocity.y, frictionBlend);

    //Movement
    this.x += this.velocity.x * time.deltaTime;
    this.y += this.velocity.y * time.deltaTime;

    this.draw();
  }
}

export let userPlayer = new Player(canvas.width / 2, canvas.height / 2);
