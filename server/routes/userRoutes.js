const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/users', userController.createUser);  // Public (sign-up)
router.get('/users', authenticateToken, userController.getAllUsers);  // Protected
router.get('/users/:id', authenticateToken, userController.getUserById);  // Protected
router.put('/users/:id', authenticateToken, userController.updateUser);  // Protected
router.delete('/users/:id', authenticateToken, userController.deleteUser);  // Protected

module.exports = router;