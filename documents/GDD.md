# Overview

This will be a multiplayer top down shooter in a simmilar style to zombs royale, with a gun building system simmilar to many tactical shooters. The game will revolve around clearing levels, alone or with friends (with friendly fire enabled).

When a player opens the game they will be greeted with a menu to build their own gun, then they can input a code to join a game room (or play alone), the difficulty will vary based on the amount of players and XP the players have.

The players XP will increase when they clear a level and will allow them to improve their gun (as it will unlock gun parts) - it will be linked to browser fingerprint.

# Mechanics

Players must be able to move and shoot, there are no special mechanics. The main mechanic will be the ability to build your own gun.

The gun will be made out of:

- **body** (changes bullet type and bullets at once)
- **grip** (changes mobility and accuracy)
- **stock** (changes mobility, accuracy and power)
- **magazine** (changes reload time, capacity, and fire rate)

Each gun will have these stats:

- **fire rate**
- **mobility** (how quickly player can move)
- **accuracy** (how much spread there will be when player shoots)
- **reload time**
- **recoil**
- **mag capacity** & **bullets shot at once**
- **bullet type**

# Art and Audio

The art will be heavily inspired by "Zombs Royale" but will have a more cartoony style, with more saturated colors and a fun look.

The audio will follow this design core and be cartoony, to make it all come together.

# Technical Design

There will be a player class, with two main parts - the position, velocity and rotation - and the gun.
The gun class will keep track of each of the parts of the gun, and calculate what all of the stats are based on these parts.

When shooting, a trigger will be sent to the gun to make it shoot, this will then trigger a function in the bullet. The bullet will be put in an array of all of the bullets, which will be updated each frame by the client who shot the bullet, and sent to the server as a position. All of the collision code for the bullets will be done client side - then when a bullet hits something, this is also sent to the server.
