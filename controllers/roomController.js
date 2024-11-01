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

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);

  client.tokens
    .create()
    .then((token) => res.send({ token }))
    .catch((err) => {
      console.log("Error fetching TURN credentials:", err);
      res.send({ token: null });
    });
};
