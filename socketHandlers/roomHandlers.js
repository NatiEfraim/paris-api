const rooms = require("../models/Room");
const { v4: uuidv4 } = require("uuid");

const createNewRoomHandler = (data, socket) => {
  const { identity, onlyAudio } = data;
  const roomId = uuidv4();

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  };
  rooms.push({ id: roomId, connectedUsers: [newUser] });

  socket.join(roomId);
  socket.emit("room-id", { roomId });
  socket.emit("room-update", {
    connectedUsers: rooms.find((room) => room.id === roomId).connectedUsers,
  });
};

const joinRoomHandler = (data, socket) => {
  const room = rooms.find((room) => room.id === data.roomId);
  if (room) {
    const newUser = {
      identity: data.identity,
      id: uuidv4(),
      socketId: socket.id,
      roomId: data.roomId,
      onlyAudio: data.onlyAudio,
    };
    room.connectedUsers.push(newUser);

    socket.join(data.roomId);
    room.connectedUsers.forEach((user) => {
      if (user.socketId !== socket.id) {
        socket
          .to(user.socketId)
          .emit("conn-prepare", { connUserSocketId: socket.id });
      }
    });

    socket
      .to(data.roomId)
      .emit("room-update", { connectedUsers: room.connectedUsers });
  }
};

module.exports = (io, socket) => {
  socket.on("create-new-room", (data) => createNewRoomHandler(data, socket));
  socket.on("join-room", (data) => joinRoomHandler(data, socket));
};
