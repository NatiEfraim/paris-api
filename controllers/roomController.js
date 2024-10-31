const rooms = require("../models/Room");
const twilio = require("twilio");

exports.checkRoomExists = (req, res) => {
  const room = rooms.find((room) => room.id === req.params.roomId);
  if (room) {
    res.send({ roomExists: true, full: room.connectedUsers.length > 3 });
  } else {
    res.send({ roomExists: false });
  }
};

exports.getTurnCredentials = (req, res) => {
    const accountSid = "AC7cff1792ce0f8d410f4790a5048eeeb7";
    const authToken = "c9f5e65fe22c2e6764d5ca5530d4970c";
//   const accountSid = process.env.TWILIO_ACCOUNT_SID;
//   const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);

  client.tokens
    .create()
    .then((token) => res.send({ token }))
    .catch((err) => {
      console.log("Error fetching TURN credentials:", err);
      res.send({ token: null });
    });
};
