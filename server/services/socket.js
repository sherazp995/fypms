const socket = require('socket.io')
let io;

function initializeSocket(server) {
  io = socket(server);

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('projectSelected', (data) => {
      console.log('Received custom event:', data);
      socket.broadcast.emit('projectSelected', data);
    });
  });
}

function getIO() {
  return io;
}

module.exports = {
  initializeSocket,
  getIO,
};
