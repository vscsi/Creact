const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");

const chatroomController = require("../controllers/chatroominit");

router.get("/chatroominit", verifyJWT, chatroomController.chatroominit);

module.exports = router;
