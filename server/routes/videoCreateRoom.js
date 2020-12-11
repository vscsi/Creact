// //require modules
const express = require('express');
const app = express();
const router = express.Router();
const videoCreateRoomController = require('../controllers/videoCreateRoom');

router.post('/workspace/:workspacename/video', videoCreateRoomController.postVideoCreateRoom);

module.exports = router;
