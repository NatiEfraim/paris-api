const roomHandlers = require("../socketHandlers/roomHandlers");
const userHandlers = require("../socketHandlers/userHandlers");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    roomHandlers(io, socket);
    userHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${socket.id}`);
      userHandlers.disconnectHandler(socket);
    });
  });
};
