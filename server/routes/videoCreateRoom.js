// //require modules
const express = require('express');
const app = express();
const router = express.Router();
const { jwtDecode } = require("../_helpers/jwt-handler");
const videoCreateRoomController = require('../controllers/videoCreateRoom');

router.post('/workspace/:currentWorkspace/video/:videoID',jwtDecode, videoCreateRoomController.postVideoCreateRoom);
router.post('/workspace/:currentWorkspace/video', jwtDecode,videoCreateRoomController.postVideoJoinRoom);

module.exports = router;
