# Context

I plan on making a top down shooter, it will have customizable guns (similar to many tactical shooters) and will be PVE (with friendly fire enabled)
For this I need to have two main scenes

- **Game Scene**: Players will shoot and kill enemies to clear a level
- **Lobby Scene**: Players will change parts of their guns and join rooms

# Problem #1

I need a way to keep the gun system modulable - so it is easy to add types of bullets, actions, bodys and all sorts of things.

# Solution

To keep the project as modulable as possible (and keep the code clean) I will use classes for most things - specifically the player, the bullets and the guns.

### Player Class

The player class will have two main parts - one focused on the position, velocity and rotation and one focused on the gun the player has.

### Gun Class

Since each gun may vary, the gun class will be made up of many parts. Each part will change the guns stats, such as `fireRate`, `accuracy`,and `mobility`. Each gun will also have a type of bullet it uses.

The gun also must be split in a set amount of parts, such as `body`, `action` and `magazine` so that it is easy to make parts and everything is modulable

### Gun Parts

Each gun part will be in a class named after the gun part - this class will have stats which are given to the `calculateStats()` function of the gun, they will also have an image.

### Bullet Class

For the bullet class there will be the most variation, some bullets may explode, some may bounce everywhere. Each bullet type will have their own class, unless bullets are simmilar and can be built off eachother. They will have a function that will run when they are shot, and one which will run each frame.

When shot it will be given a `power` number to indicate how much damage it will do - it is also up to the bullet code what else to do with the `power` number.

The info of from where the bullet shot and which direction, then each client will update each bullet and check each collision.

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

# Promblem #4

How will I handle all the images, for bullets and guns?

# Solution

All of the images can be on one big sprite sheet - one for the guns and one for bullets. I can give each bullet class a cell X which decides which image on the sprite sheet to draw, and give each gun part a cell X for which image to draw. The gun parts will have two views, the in-menu view and the top down one seen in-game. They can both use the same cell X
