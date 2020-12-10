const express = require('express');
const router = express.Router();

const userController = require("../controllers/user");

router.get("/username", userController.getUserName);

module.exports = router;