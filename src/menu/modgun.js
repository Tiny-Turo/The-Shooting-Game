import { Button } from "./button";
import { gunParts } from "../gunparts";
import { gun, setGun } from "../gun";

let gunPartsIndex = {
  body: 0,
  grip: 0,
  stock: 0,
  magazine: 0,
};

function changePart(part, add = 1) {
  gunPartsIndex[part] += add;

  gunPartsIndex[part] = (gunPartsIndex[part] + gunParts[part].length) % gunParts[part].length;

  setGun(gunParts.body[gunPartsIndex.body], gunParts.grip[gunPartsIndex.grip], gunParts.stock[gunPartsIndex.stock], gunParts.magazine[gunPartsIndex.magazine]);
}

export function loadButtons() {
  new Button(0, 0, () => changePart("body", -1), 200, 100);
  new Button(210, 0, () => changePart("body"), 200, 100);

  new Button(0, 110, () => changePart("grip", -1), 200, 100);
  new Button(210, 110, () => changePart("grip"), 200, 100);

  new Button(
    0,
    220,
    () => changePart("stock", -1),
    200,
    100,
    () => {
      return !gun.body.canModStock;
    }
  );

  new Button(
    210,
    220,
    () => changePart("stock"),
    200,
    100,
    () => {
      return !gun.body.canModStock;
    }
  );

  new Button(
    0,
    330,
    () => changePart("magazine", -1),
    200,
    100,
    () => {
      return !gun.body.canModMag;
    }
  );

  new Button(
    210,
    330,
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
let bulletImage = null;
export function drawStats() {
  statY = 0;

  drawStat(gun.mobility, "mobility: " + gun.mobility);
  drawStat(gun.accuracy, "accuracy: " + gun.accuracy);
  if (gun.fireRate > 0) drawStat(gun.fireRate / 0.5, "fire rate: " + gun.fireRate);
  else drawStat(0, "fire rate: " + gun.fireRate);
  drawStat(gun.power, "power: " + gun.power);
  drawStat(gun.reloadTime / 5, "reload time: " + gun.reloadTime);

  bulletImage = new gun.BulletClass(canvas.width - 450, 50, 0, -1);
  bulletImage.draw();
}

function drawStat(value, name) {
  ctx.fillStyle = "#D52941";
  ctx.fillRect(canvas.width - 400, statY, 400 * value, 50);

  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(name, canvas.width - 400 + 20, statY + 40);

  statY += 60;
}
