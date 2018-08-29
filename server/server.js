const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New User Connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Name and Room name are required");
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));

    socket.emit("newMessage", generateMessage("Admin", "Welcome to chat App"));
    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined`)
      );

    callback();
  });

  socket.on("createMessage", (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, message.text)
      );
    }
    callback();
  });

  socket.on("createLocationMessage", coords => {
    var user = users.getUser(socket.id);
    if (user) {
      io.emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on("disconnect", () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

//socket.leave(params.room) - leave room
//io.to(params.room).emit - everyone in room
//socket.broadcast.to(params.room).emit() - everyone in room except current user
//io.emit() - emit to everyone connected
//socket.broadcast.emit() - sends to message everyone except current user
//socket.emit() - to one user
