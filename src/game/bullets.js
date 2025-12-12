export let bullets = [];

export function updateBullets() {
  bullets = bullets.filter((bullet) => !bullet.destroy);

  //Update the players bullets
  for (const bullet of bullets) {
    bullet.update();
    bullet.draw();
  }
}

window.pushBullets = function (newBullets) {
  bullets = bullets.concat(newBullets);
};
