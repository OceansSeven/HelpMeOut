var app = require('express');
var http = require('http').createServer(app);
const PORT = 8080;

var io = require('socket.io')(http, {
  cors: {
    origin: `http://3.142.247.211`,
    methods: ['GET', 'POST']
  }
});

// when connection is established
io.on('connection', (socket) => {
  // if joining room, console log and join
  socket.on('join', (room) => {
    socket.join(room);
  })

  // if message is sent deconstruct data
  socket.on('chat', ({room, fromId, toId, body, date}) => {

    // emit object
    io.to(room).emit('chat', {fromId, toId, body, date});
  })
});

io.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});