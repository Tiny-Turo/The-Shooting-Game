export let bullets = [];

export function updateBullets(walls) {
  bullets = bullets.filter((bullet) => !bullet.destroy);

  //Update the players bullets
  for (const bullet of bullets) {
    bullet.update(walls);
    bullet.draw();
  }
}

window.pushBullet = function (newBullet) {
  bullets.push(newBullet);
};
