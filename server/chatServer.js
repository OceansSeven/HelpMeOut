var app = require('express');
var http = require('http').createServer(app);
const PORT = 8080;

var io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// when connection is established
io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  // if disconnect, console log
  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  // if joining room, console log and join
  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joined ${room}`);
    socket.join(room);
  })

  // if message is sent deconstruct data
  socket.on('chat', ({room, fromId, toId, body, date}) => {
    console.log(`${date} - room: ${room}, msg: ${body}, user: ${fromId}`);

    // emit a JSON object
    io.to(room).emit('chat', {fromId, toId, body, date});
  })
});

io.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});