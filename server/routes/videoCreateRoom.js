// //require modules
const express = require('express');
const app = express();
const router = express.Router();
const videoCreateRoomController = require('../controllers/videoCreateRoom');

router.post('/workspace/:currentWorkspace/video/:videoID', videoCreateRoomController.postVideoCreateRoom);
router.post('/workspace/:currentWorkspace/video', videoCreateRoomController.postVideoJoinRoom)
module.exports = router;
