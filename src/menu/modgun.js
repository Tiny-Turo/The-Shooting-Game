import { Button } from "./button";
import { gunParts } from "../gunparts";
import { gun, setGun } from "../gun";

let gunPartsIndex = {
  body: 0,
  grip: 0,
  stock: 0,
  magazine: 0,
};

let PADDING = 15;

function changePart(part, add = 1) {
  gunPartsIndex[part] += add;

  gunPartsIndex[part] = (gunPartsIndex[part] + gunParts[part].length) % gunParts[part].length;

  setGun(gunParts.body[gunPartsIndex.body], gunParts.grip[gunPartsIndex.grip], gunParts.stock[gunPartsIndex.stock], gunParts.magazine[gunPartsIndex.magazine]);
}

export function loadButtons() {
  new Button(PADDING, PADDING, () => changePart("body", -1), 200, 100);
  new Button(200 + PADDING * 2, PADDING, () => changePart("body"), 200, 100);

  new Button(PADDING, 100 + PADDING * 2, () => changePart("grip", -1), 200, 100);
  new Button(200 + PADDING * 2, 100 + PADDING * 2, () => changePart("grip"), 200, 100);

  new Button(
    PADDING,
    (100 + PADDING) * 2 + PADDING,
    () => changePart("stock", -1),
    200,
    100,
    () => {
      return !gun.body.canModStock;
    }
  );

  new Button(
    200 + PADDING * 2,
    (100 + PADDING) * 2 + PADDING,
    () => changePart("stock"),
    200,
    100,
    () => {
      return !gun.body.canModStock;
    }
  );

  new Button(
    PADDING,
    (100 + PADDING) * 3 + PADDING,
    () => changePart("magazine", -1),
    200,
    100,
    () => {
      return !gun.body.canModMag;
    }
  );

  new Button(
    200 + PADDING * 2,
    (100 + PADDING) * 3 + PADDING,
    () => changePart("magazine"),
    200,
    100,
    () => {
      return !gun.body.canModMag;
    }
  );
}

changePart("body");

let statY = 0;
export function drawStats() {
  statY = PADDING;

  drawStat(gun.mobility / MAX_STAT_VALUE, "mobility");
  drawStat(gun.accuracy / MAX_STAT_VALUE, "accuracy");
  drawStat(gun.power / MAX_STAT_VALUE, "power");

  drawStat(-1, "reload time: " + gun.reloadTime + "s");
  if (gun.fireRate > 0) drawStat(-1, "fire rate: " + gun.fireRate + "s");

  ctx.fillStyle = "#E2C044";
  ctx.fillRect(canvas.width - 500 - PADDING * 2, PADDING, 100, 100);
  let bulletImage = new gun.BulletClass(canvas.width - 450 - PADDING * 2, 50 + PADDING, 0, -1, 0, true);
  bulletImage.draw();

  ctx.font = "25px saeada";
  ctx.fillStyle = "black";
  ctx.fillText(gun.magCapacity + "x", canvas.width - 490 - PADDING * 2, 90 + PADDING);
}

function drawStat(value, name) {
  if (value >= 0) {
    ctx.fillStyle = "#E2C044";
    ctx.fillRect(canvas.width - 400 - PADDING, statY, 400, 50);
    ctx.fillStyle = "#D52941";
    ctx.fillRect(canvas.width - 400 - PADDING, statY, 400 * value, 50);
  }

  ctx.font = "40px saeada";
  ctx.fillStyle = "black";
  ctx.fillText(name, canvas.width - 380 - PADDING, statY + 36);
  statY += 50 + PADDING;
}
