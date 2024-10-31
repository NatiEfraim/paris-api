const connectedUsers = require("../models/User");

const disconnectHandler = (socket) => {
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);
    room.connectedUsers = room.connectedUsers.filter(
      (u) => u.socketId !== socket.id
    );
    socket.leave(user.roomId);

    if (room.connectedUsers.length > 0) {
      socket.to(room.id).emit("user-disconnected", { socketId: socket.id });
      socket
        .to(room.id)
        .emit("room-update", { connectedUsers: room.connectedUsers });
    } else {
      rooms = rooms.filter((r) => r.id !== room.id);
    }
  }
};

module.exports = { disconnectHandler };
