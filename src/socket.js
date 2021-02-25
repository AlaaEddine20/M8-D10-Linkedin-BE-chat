const socketio = require("socket.io");
const { addUserToRoom } = require("./utils/users");

// function to crerate a server
const createSocketServer = (server) => {
  // create server
  const io = socketio(server);
  // once i have the server: listen to events
  // on is to listen to events
  // emit method sends events
  io.on("connection", (socket) => {
    // a new socket will come and it will be handled by this function
    console.log(`A user connected with id: ${socket.id}`);

    socket.on("joinRoom", async (data) => {
      try {
        // add user to specified room (in mongo db)
        const { username, room } = await addUserToRoom({
          socketId: socket.id,
          ...data,
        });
        // join is a method to join rooms
        socket.join(room);
      } catch (error) {
        console.log(error);
      }
    }); // when users join the chat room

    socket.on("sendMessage", (msg) => {}); // when users send messages

    socket.on("leaveRoom", (room) => {}); // when a user leaves a chat room
  });
};

module.exports = createSocketServer;
