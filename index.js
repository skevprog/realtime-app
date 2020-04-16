const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(`public`));

io.on('connection', socket => {
  console.log('user connected');

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
