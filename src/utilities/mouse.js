window.mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();

  const scale = canvas.width / rect.width;

  mouse.x = (e.clientX - rect.left) * scale;
  mouse.y = (e.clientY - rect.top) * scale;
});
