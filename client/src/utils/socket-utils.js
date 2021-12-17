import io from 'socket.io-client';

// socket is declared but not initiated
let socket;

// I used this as a guide to build out the socket utility functions
// https://levelup.gitconnected.com/handling-socketio-rooms-with-react-hooks-4723dd44692e

export const initiateSocket = (room) => {
  // connect to chat server to specific room
  socket = io(`http://3.142.247.211:8080`);
  // have socket connect to the chat room for user to user communication
  // emit join event
  if (socket && room) {
    socket.emit('join', room);
  }
}

// disconnect from socket to ensure minimal number of sockets are open
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

// subscribe takes in an error first callback function
export const subscribeToChat = (cb) => {
  // if there is no socket return true
  if (!socket) {
    return true;
  }

  // if there is a socket, on a chat emit message and return callback
  // callback will be used to change React component state
  socket.on('chat', (msg) => {
    return cb(null, msg);
  });
}

// send message will emit a chat event and send the inputs to the server
export const sendMessage = (room, fromId, toId, body, date) => {
  if (socket) {
    socket.emit('chat', {room, fromId, toId, body, date});
  }
}