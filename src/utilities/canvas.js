// Canvas
window.canvas = document.getElementById("myCanvas");
window.ctx = canvas.getContext("2d");

function resize() {
  const container = canvas.parentElement;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const canvasAspect = canvas.width / canvas.height;
  const containerAspect = containerWidth / containerHeight;

  if (containerAspect > canvasAspect) {
    canvas.style.height = "100%";
    canvas.style.width = "auto";
  } else {
    canvas.style.width = "100%";
    canvas.style.height = "auto";
  }
}

resize();
window.addEventListener("resize", resize);
