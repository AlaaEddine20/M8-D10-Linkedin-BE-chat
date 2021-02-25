const socketio = require("socket.io");

// function to crerate a server
const createSocketServer = (server) => {
  // create server
  const io = socketio(server);
  // once i have the server: listen to events
  // on is to listen to events
  // emit method sends events
  io.on("connection", (socket) => {
    // a new socket will come and it will be handled by this function
    console.log(`A user connected wirh id: ${socket.id}`);
  });
};

module.exports = createSocketServer;
