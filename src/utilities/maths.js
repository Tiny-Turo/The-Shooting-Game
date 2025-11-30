window.normalize = function (a) {
  const h = Math.sqrt(a.x ** 2 + a.y ** 2);
  if (h == 0) return { x: 0, y: 0 };
  const x = a.x / h;
  const y = a.y / h;
  return { x, y };
};

window.magnitude = function (a) {
  return Math.sqrt(a.x ** 2 + a.y ** 2);
};

window.lerp = function (a, b, t) {
  return a * (1 - t) + b * t;
};
