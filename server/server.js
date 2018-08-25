const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const utils = require("./utils/message");
const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New User Connected");

  socket.emit(
    "newMessage",
    utils.generateMessage("Admin", "Welcome to chat App")
  );

  socket.broadcast.emit(
    "newMessage",
    utils.generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (newMessage, callback) => {
    console.log("createMessage", newMessage);

    io.emit(
      "newMessage",
      utils.generateMessage(newMessage.from, newMessage.text)
    );

    callback();
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      utils.generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
