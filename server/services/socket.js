const socket = require('socket.io');
const redisAdapter = require("socket.io-redis");
const { setupMaster, setupWorker } = require("@socket.io/sticky");
let io;

function setupMasterAdapter(server) {
  setupMaster(server, {
    loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
  });
}

function initializeSocket(server) {
  io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
  setupWorker(io);

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('projectSelected', (data) => {
      socket.broadcast.emit('projectSelected', data);
    });
  });
}

function getIO() {
  return io;
}

module.exports = {
  setupMasterAdapter,
  initializeSocket,
  getIO,
};
