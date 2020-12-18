const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");

const userController = require("../controllers/user");

router.get("/username", verifyJWT, userController.getUserName);

router.post('/checkloginusers', verifyJWT, userController.checkLoginUsers)

module.exports = router;
