const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New User Connected');

  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey, what is going on?',
    createdAt: 123
  });

  socket.on('createMessage', newMessage => {
    console.log('createMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
