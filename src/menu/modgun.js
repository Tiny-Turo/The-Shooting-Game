import { Button } from "./button";
import { gunParts } from "../gunparts";
import { gun, setGun } from "../gun";

let gunPartsIndex = {
  body: 0,
  grip: 0,
  stock: 0,
  magazine: 0,
};

function changePart(part) {
  gunPartsIndex[part]++;

  if (gunPartsIndex[part] >= gunParts[part].length) gunPartsIndex[part] = 0;
  setGun(gunParts.body[gunPartsIndex.body], gunParts.grip[gunPartsIndex.grip], gunParts.stock[gunPartsIndex.stock], gunParts.magazine[gunPartsIndex.magazine]);
}

export function loadButtons() {
  new Button(0, 0, () => changePart("body"));

  new Button(0, 220, () => changePart("grip"));

  new Button(
    0,
    330,
    () => changePart("stock"),
    400,
    100,
    () => {
      return !gun.body.canModStock;
    }
  );
  new Button(
    0,
    110,
    () => changePart("magazine"),
    400,
    100,
    () => {
      return !gun.body.canModMag;
    }
  );
}

changePart("body");
