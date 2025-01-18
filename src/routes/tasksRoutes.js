const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get('/tasks', tasksController.getTasks);
router.get('/tasks/:id', tasksController.getTask);
router.post('/tasks', tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask)
router.put('/tasks/:id', tasksController.updateTask)
router.patch('/tasks/:id/status', tasksController.updateTaskStatus)

module.exports = router;
