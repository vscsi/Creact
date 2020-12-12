//==== Routers set up ====//

//require modules
const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");

const taskController = require("../controllers/tasks");

router.get("/tasks", verifyJWT, taskController.getTasks);

router.post("/task", verifyJWT, taskController.postTask);

router.delete("/tasks/:id", verifyJWT, taskController.deleteTasks);

router.post("/task/checkadmin", verifyJWT, taskController.postCheckAdmin);

module.exports = router;
