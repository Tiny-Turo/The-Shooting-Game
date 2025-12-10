import { gun, setGun } from "../gun";
import { Button } from "./button";
import { bodys, magazines, grips, actions } from "../gunparts";

let gunPartsIndex = [0, 0, 0, 0];
// 0 = barrel, 1 = magazine, 2 = grip, 3 = body

export function makeGun() {
  setGun(bodys[gunPartsIndex[0]], magazines[gunPartsIndex[1]], grips[gunPartsIndex[2]], actions[gunPartsIndex[3]]);
}

function changeBody() {
  gunPartsIndex[0]++;
  if (gunPartsIndex[0] >= bodys.length) gunPartsIndex[0] = 0;
  makeGun();
}

function changeMag() {
  gunPartsIndex[1]++;
  if (gunPartsIndex[1] >= magazines.length) gunPartsIndex[1] = 0;
  makeGun();
}

function changeGrip() {
  gunPartsIndex[2]++;
  if (gunPartsIndex[2] >= grips.length) gunPartsIndex[2] = 0;
  makeGun();
}

function changeAction() {
  gunPartsIndex[3]++;
  if (gunPartsIndex[3] >= actions.length) gunPartsIndex[3] = 0;
  makeGun();
}

new Button(0, 100, changeBody);
new Button(0, 200, changeMag);
new Button(0, 300, changeGrip);
new Button(0, 400, changeAction);

export function showStats() {
  const BAR_WIDTH = 300;
  const BAR_HEIGHT = 40;

  ctx.fillStyle = "red";

  ctx.fillRect(canvas.width - BAR_WIDTH, 0, BAR_WIDTH * gun.MOBILITY, BAR_HEIGHT);
  ctx.fillRect(canvas.width - BAR_WIDTH, BAR_HEIGHT, BAR_WIDTH * gun.ACCURACY, BAR_HEIGHT);

  // ctx.fillRect(canvas.width - BAR_WIDTH, 0, BAR_WIDTH * , BAR_HEIGHT);
  // ctx.fillRect(canvas.width - BAR_WIDTH, 0, BAR_WIDTH, BAR_HEIGHT);
  // ctx.fillRect(canvas.width - BAR_WIDTH, 0, BAR_WIDTH, BAR_HEIGHT);
  // ctx.fillRect(canvas.width - BAR_WIDTH, 0, BAR_WIDTH, BAR_HEIGHT);
}
