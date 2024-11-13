const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
require('dotenv').config();

// const isProtected = process.env.PROTECTED_ROUTES === 'true';
//
// if (isProtected) {
//     router.post('/tasks', authenticateToken, taskController.createTask);
//     router.get('/tasks', authenticateToken, taskController.getAllTasks);
//     router.get('/tasks/:id', authenticateToken, taskController.getTaskById);
//     router.put('/tasks/:id', authenticateToken, taskController.updateTask);
//     router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);
// } else {
//     router.get('/tasks', taskController.getAllTasks);
//     router.post('/tasks', taskController.createTask);
//     router.get('/tasks/:id', taskController.getTaskById);
//     router.put('/tasks/:id', taskController.updateTask);
//     router.delete('/tasks/:id', taskController.deleteTask);
// }

router.post('/tasks',authenticateToken, taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id',authenticateToken, taskController.getTaskById);
router.put('/tasks/:id',authenticateToken, taskController.updateTask);
router.delete('/tasks/:id',authenticateToken, taskController.deleteTask);

module.exports = router;
