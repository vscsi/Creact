//==== Routers set up ====//

//require modules
const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../_helpers/jwt-handler");

const taskController = require("../controllers/tasks");

router.post("/tasks", verifyJWT, taskController.postTasks);

router.post("/task", verifyJWT, taskController.postTask);

router.delete("/tasks/:id", verifyJWT, taskController.deleteTasks);

router.get("/task/usertasks", verifyJWT, taskController.getUserTasks)



module.exports = router;
