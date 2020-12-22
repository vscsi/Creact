const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const registerController = require("../controllers/register");

router.get("/register", registerController.getRegister);
router.post(
  "/register",
  upload.single("image"),
  registerController.postRegister
);

module.exports = router;
