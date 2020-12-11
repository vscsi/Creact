const express = require('express');
const router = express.Router();

const workspaceController = require("../controllers/workspace");

//need to use JWT auth for this workspace route
router.post("/workspace/create", workspaceController.createWorkspace);
router.get("/workspace/list", workspaceController.getWorkSpace);

module.exports = router;