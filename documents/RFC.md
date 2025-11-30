# Context

I plan on making a top down shooter, it will have customizable guns (similar to many tactical shooters) and will be PVE (with friendly fire enabled)
For this I need to have two main scenes

- **Game Scene**: Players will shoot and kill enemies to clear a level
- **Lobby Scene**: Players will change parts of their guns and join rooms

# Problem #1

I need a way to keep the gun system modulable - so it is easy to add types of bullets, receivers, barrels and all sorts of things.

# Solution

To keep the project as modulable as possible (and keep the code clean) I will use classes for most things - specifically the player, the bullets and the guns.

### Player Class

The player class will have two main parts - one focused on the position, velocity and rotation and one focused on the gun the player has.

### Gun Class

Since each gun may vary, the gun class will be made up of many parts. Each part will change the guns stats, such as `fireRate`, `recoil`,and `mobility`. Each gun will also have a type of bullet it uses.

The gun also must be split in a set amount of parts, such as `barrel`, `receiver` and `magazine` so that it is easy to make parts and everything is modulable

### Bullet Class

For the bullet class there will be the most variation, some bullets may explode, some may bounce everywhere. For this reason, there will be a base bullet class (which just moves in a certain direction) and then bullets will be built from there. They will have a function that will run when they are shot, and one which will run each frame.

Then the client will check collisions for their own bullets, and pass the position of the bullets to the server, aswell as bullet type.

# Problem #2

I need a clean way to handle multiple scenes, including a clean menu setup - making it easy to add functional buttons and menus.

# Solution

I am able to split the game code into folders - which will store code for that specific scene. Then from the main index, I store the scenes in an object.

```
import * as Game from "./game/main.js";
import * as Menu from "./menu/main.js";

const scenes = {
  menu: Menu,
  game: Game,
};
```

Then in the `update()` function I can grab the `currentScene` and update it.

```
let currentScene = "game"

function update(){
  scenes[currentScene].update();
}
```

This however introduces the problem of how I will keep the info from one scene to another. For example if a player changes their gun in the lobby, how will I make sure this change is known when the player enters the game?

This problem is answered easily, as I can just have the information sent to the server as the player joins, or when playing alone - send the information directly to the `Player` class

# Problem #3

Menus are always a pain to make, they take time and are never very modulable

# Solution

Make a `Button` class which will store the posisition and size of the button, as well as a function to perform when pressed (passed in the constructor).

```
class Button {
  constructor(position, trigger, size = defaultSize){
    this.position = position;
    this.trigger = trigger;
    this.size = size;
  }

  onPress(){
    this.trigger();
  }
}

homeButton = new Button(position, backToMenu)
```
