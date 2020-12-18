// //require modules
const express = require('express');
const app = express();
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");
const videoCreateRoomController = require('../controllers/videoCreateRoom');

router.post('/workspace/:currentWorkspace/video',verifyJWT, videoCreateRoomController.postVideoCreateRoom);
router.get('/workspace/:currentWorkspace/video',verifyJWT, videoCreateRoomController.getVideoConferenceRoom);
router.delete('/workspace/:currentWorkspace/video',verifyJWT, videoCreateRoomController.deleteVideoConferenceRoom);

module.exports = router;
