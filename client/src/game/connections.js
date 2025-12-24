import { shotFired } from "../gun";
import { userPlayer } from "./player";
// import { userPlayer } from "./player";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080/");

//See other players
export let players = {};

socket.on("message", (player) => {
  //only ID has been send as a "disconnect" message
  if (typeof player == "string") {
    delete players[player];
    console.log(player);
    return;
  }

  if (!userPlayer) return;

  if (player.UID === userPlayer.UID) return;

  players[player.UID] = player;
});

export function updateToServer(userPlayer) {
  let simplifiedPlayer = {
    x: userPlayer.x,
    y: userPlayer.y,
    angle: userPlayer.angle,

    UID: userPlayer.UID,

    gunIndex: userPlayer.gun.body.imageIndex,
  };

  socket.emit("message", simplifiedPlayer);
}

socket.on("shotFired", (shot) => {
  if (!userPlayer) return;

  if (shot.shooterUID === userPlayer.UID) return;

  shotFired(shot, false);
  console.log("hi");
});

export function shotToServer(shot) {
  shot.shooterUID = userPlayer.UID;
  socket.emit("shotFired", shot);
}
