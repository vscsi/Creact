//==== Routers set up ====//

//require modules
const express = require('express');
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");

const docsController = require('../controllers/docs');

// router.get('/workspace/docs', verifyJWT, docsController.getTasks);
router.post('/getdoc', verifyJWT, docsController.getDoc)

// save docs
router.post('/savedoc', verifyJWT, docsController.postCheckUpdateSaveDoc);
// router.post('/savedoc', verifyJWT, docsController.postSaveNewDoc);


module.exports = router;