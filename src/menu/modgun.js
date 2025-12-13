import { Button } from "./button";
import { gunParts } from "../gunparts";
import { setGun } from "../gun";

let gunPartsIndex = {
  body: 0,
  magazine: 0,
  grip: 0,
  stock: 0,
};

function changePart(part) {
  gunPartsIndex[part]++;

  if (gunPartsIndex[part] >= gunParts[part].length) gunPartsIndex[part] = 0;
  setGun(gunParts.body[gunPartsIndex.body], gunParts.magazine[gunPartsIndex.magazine], gunParts.grip[gunPartsIndex.grip], gunParts.stock[gunPartsIndex.stock]);
}

export function loadButtons() {
  new Button(0, 0, () => changePart("body"));
  new Button(0, 110, () => changePart("magazine"));
  new Button(0, 220, () => changePart("grip"));
  new Button(0, 330, () => changePart("stock"));
}

changePart("body");
