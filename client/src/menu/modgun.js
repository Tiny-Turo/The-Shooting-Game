import { Button } from "./button";
import { gunParts } from "../gunparts";
import { gun, setGun } from "../gun";
import { BulletClassMap } from "../bullettypes";

let gunPartsIndex = {
  body: 0,
  grip: 0,
  stock: 0,
  magazine: 0,
};

let PADDING = 15;

function randomizeGun() {
  gunPartsIndex.body = Math.floor(Math.random() * gunParts.body.length);
  gunPartsIndex.grip = Math.floor(Math.random() * gunParts.grip.length);
  gunPartsIndex.magazine = Math.floor(Math.random() * gunParts.magazine.length);
  gunPartsIndex.stock = Math.floor(Math.random() * gunParts.stock.length);

  setGun(gunParts.body[gunPartsIndex.body], gunParts.grip[gunPartsIndex.grip], gunParts.stock[gunPartsIndex.stock], gunParts.magazine[gunPartsIndex.magazine]);
}

function changePart(part) {
  gunPartsIndex[part]++;

  gunPartsIndex[part] = (gunPartsIndex[part] + gunParts[part].length) % gunParts[part].length;

  setGun(gunParts.body[gunPartsIndex.body], gunParts.grip[gunPartsIndex.grip], gunParts.stock[gunPartsIndex.stock], gunParts.magazine[gunPartsIndex.magazine]);
}

export function loadButtons() {
  // Randomize
  new Button({ x: canvas.width / 2 + 100, y: canvas.height / 2 + 150, trigger: randomizeGun, width: 100, height: 100 });

  // Body
  new Button({
    x: canvas.width / 2 - 250,
    y: canvas.height / 2 - 100,
    trigger: () => changePart("body"),
    width: 650,
    height: 100,
    isVisible: false,
  });

  // Grip
  new Button({
    x: canvas.width / 2 - 200,
    y: canvas.height / 2,
    trigger: () => changePart("grip"),
    width: 100,
    height: 100,
    isVisible: false,
  });

  // Stock
  new Button({
    x: canvas.width / 2 - 400,
    y: canvas.height / 2 - 100,
    trigger: () => changePart("stock"),
    width: 150,
    height: 200,
    disableTrigger: () => !gun.body.canModStock,
    isVisible: false,
  });

  // Magazine
  new Button({
    x: canvas.width / 2 - 50,
    y: canvas.height / 2,
    trigger: () => changePart("magazine"),
    width: 100,
    height: 100,
    disableTrigger: () => !gun.body.canModMag,
    isVisible: false,
  });

  randomizeGun();
}

let statY = 0;
export function drawStats() {
  statY = PADDING;

  drawStat(gun.mobility / MAX_STAT_VALUE, "mobility");
  drawStat(gun.accuracy / MAX_STAT_VALUE, "accuracy");
  drawStat(gun.power / MAX_STAT_VALUE, "power");
  drawStat(gun.fireRate / MAX_STAT_VALUE, "fire rate");

  drawStat(-1, "reload time: " + gun.reloadTime + "s");

  ctx.fillStyle = "#E2C044";
  ctx.fillRect(canvas.width - 500 - PADDING * 2, PADDING, 100, 100);
  let bulletImage = new BulletClassMap[gun.BulletClassName](canvas.width - 450 - PADDING * 2, 50 + PADDING, 0, -1, 0, true);
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
