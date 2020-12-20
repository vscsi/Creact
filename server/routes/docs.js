//==== Routers set up ====//

//require modules
const express = require('express');
const router = express.Router();

const docsController = require('../controllers/docs');

// router.get('/workspace/docs', verifyJWT, docsController.getTasks);


// save docs
router.post('/savedoc', verifyJWT, docsController.postCheckUpdateDoc);
router.post('/savedoc', verifyJWT, docsController.postSaveNewDoc);


module.exports = router;