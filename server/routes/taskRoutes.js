const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.post('/tasks',authenticateToken, taskController.createTask);
router.get('/tasks',authenticateToken, taskController.getAllTasks);
router.get('/tasks/:id',authenticateToken, taskController.getTaskById);
router.put('/tasks/:id',authenticateToken, taskController.updateTask);
router.delete('/tasks/:id',authenticateToken, taskController.deleteTask);

module.exports = router;
