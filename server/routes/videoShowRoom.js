// //require modules
const express = require('express');
const app = express();
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");
const videoShowRoomController = require('../controllers/videoShowRoom');

router.post('/workspace/:currentWorkspace/video/rooms',verifyJWT, videoShowRoomController.postVideoShowRoom);

module.exports = router;
