import { shotFired } from "../gun";
// import { userPlayer } from "./player";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080/");

//See other players
export let players = {};

socket.on("message", (player) => {
  players[player.uid] = player;
});

export function updateToServer(userPlayer) {
  let simplifiedPlayer = {
    x: userPlayer.x,
    y: userPlayer.y,
    angle: userPlayer.angle,

    uid: userPlayer.uid,

    gunIndex: userPlayer.gun.body.imageIndex,
  };

  socket.emit("message", simplifiedPlayer);
}

socket.on("shotFired", (shot) => {
  shotFired(shot, false);
  console.log("hi");
});

export function shotToServer(shot) {
  socket.emit("shotFired", shot);
}
