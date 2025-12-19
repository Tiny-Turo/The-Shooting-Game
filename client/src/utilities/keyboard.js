window.keysDown = {};

window.addEventListener("keydown", (e) => {
  keysDown[e.code] = true;
});
window.addEventListener("keyup", (e) => {
  keysDown[e.code] = false;
});
