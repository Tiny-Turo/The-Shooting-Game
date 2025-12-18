export const walls = [
  { x: 0, y: 0, width: 100, height: 1440 },
  { x: 0, y: 0, width: 1440, height: 100 },
  { x: 1440 - 100, y: 0, width: 100, height: 1440 },
  { x: 0, y: 1440 - 100, width: 1440, height: 100 },
  { x: 720 - 200, y: 720 - 200, width: 400, height: 400 },
];

export function drawWalls() {
  for (const wall of walls) {
    ctx.fillStyle = "#D7D0C3";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  }
}

// export function intersects(circle, rectangle) {
//   const closestX = Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.width));

//   const closestY = Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.height));

//   const dx = circle.x - closestX;
//   const dy = circle.y - closestY;

//   return dx * dx + dy * dy <= circle.radius * circle.radius;
// }

export function resolveCircleRect(circle, rect) {
  // closest point on rect to circle
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const dx = circle.x - closestX;
  const dy = circle.y - closestY;

  const distSq = dx * dx + dy * dy;
  const rSq = circle.radius * circle.radius;

  if (distSq < rSq) {
    let dist = Math.sqrt(distSq);

    // avoid divide by zero
    if (dist === 0) {
      dist = 1;
    }

    const overlap = circle.radius - dist;

    const newX = circle.x + (dx / dist) * overlap;
    const newY = circle.y + (dy / dist) * overlap;

    return { newX, newY };
  }

  return null;
}
