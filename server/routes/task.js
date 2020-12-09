//==== Routers set up ====//

//require modules
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/tasks');

router.get('/workspace/tasks', taskController.getTasks);

router.post('/task', taskController.postTask);

router.delete('/tasks/:id', taskController.deleteTasks)


module.exports = router;