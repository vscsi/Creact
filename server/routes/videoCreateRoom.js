// //require modules
const express = require('express');
const app = express();
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");
const videoCreateRoomController = require('../controllers/videoCreateRoom');

router.post('/workspace/:currentWorkspace/video',verifyJWT, videoCreateRoomController.postVideoCreateRoom);
// router.post('/workspace/:currentWorkspace/video', verifyJWT,videoCreateRoomController.postVideoJoinRoom);
router.get('/workspace/:currentWorkspace/video',verifyJWT, videoCreateRoomController.getVideoConferenceRoom);

module.exports = router;
