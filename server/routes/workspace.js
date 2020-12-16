const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");

const workspaceController = require("../controllers/workspace");

//need to use JWT auth for this workspace route
router.post(
  "/workspace/create",
  verifyJWT,
  workspaceController.createWorkspace
);
router.get("/workspace/list", verifyJWT, workspaceController.getWorkSpace);

router.post("/workspace/check", verifyJWT, workspaceController.postCheck);

router.get("/workspace/all", verifyJWT, workspaceController.getAllWorkspaces);

router.post("/workspace/join", verifyJWT, workspaceController.postJoin);

router.post("/workspace/chatroominit", verifyJWT, workspaceController.chatroomInit);

module.exports = router;
