const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatroom/chatroom');

router.get('/chatroom', chatController);


module.exports = router;