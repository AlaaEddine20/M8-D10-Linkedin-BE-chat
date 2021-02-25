const RoomSchema = require("../services/rooms/schema");

const addUserToRoom = async ({ username, socketId, room }) => {
  try {
    // check if that room has that user
    const currentUSer = await RoomSchema.findOne({
      name: room,
      "members.username": username,
    });

    if (currentUSer) {
      // if user is already in room upodate socketId
      // "members.username" mongo method to reference a prop in the schema model
      await RoomSchema.findOneAndUpdate(
        { name: room, "members.username": username },
        { "members.$.socketId": socketId } // replace old id with new one
      );
    } else {
      // if not add it
      await RoomSchema.findOneAndUpdate(
        { name: room },
        { $push: { members: { username, socketId } } } // create new user & id
      );
    }
    return { username, room };
  } catch (error) {
    console.log(error);
  }
};

const getUsersInRoom = async (roomName) => {
  try {
    const room = await RoomModel.findOne({ name: roomName });
    return room.members;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addUserToRoom, getUsersInRoom };
