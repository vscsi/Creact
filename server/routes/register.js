const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
router.use(upload.array());

const registerController = require('../controllers/register');

router.post('/register', upload.single('image'), registerController.postRegister)

module.exports=router;