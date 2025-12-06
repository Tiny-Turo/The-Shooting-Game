window.mouse = { x: 0, y: 0, isDown: false };

window.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();

  const scale = canvas.width / rect.width;

  mouse.x = (e.clientX - rect.left) * scale;
  mouse.y = (e.clientY - rect.top) * scale;
});

window.addEventListener("mousedown", (e) => {
  mouse.isDown = true;
});
window.addEventListener("mouseup", (e) => {
  mouse.isDown = false;
});
