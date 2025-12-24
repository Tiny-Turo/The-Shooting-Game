const http = require("http").createServer();
const io = require("socket.io")(http, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    socket.data.UID = message.UID;
    io.emit("message", message);
  });

  socket.on("shotFired", (message) => {
    io.emit("shotFired", message);
    console.log("Pew Pew!");
  });

  socket.on("disconnect", function () {
    console.log("Someone has left!");
    io.emit("message", socket.data.UID);
  });
});

http.listen(8080, () => console.log("Server listening on port 8080"));
