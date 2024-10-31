const express = require("express");
const {
  checkRoomExists,
  getTurnCredentials,
} = require("../controllers/roomController");

const router = express.Router();

router.get("/room-exists/:roomId", checkRoomExists);
router.get("/get-turn-credentials", getTurnCredentials);

module.exports = router;
