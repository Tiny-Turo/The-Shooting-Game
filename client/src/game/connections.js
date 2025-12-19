import { userPlayer } from "./player";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080/");

//See other players
export let players = {};

window.peopleInRace = 0;
socket.on("message", (player) => {
  if (player.uid == userPlayer.uid) return;
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
