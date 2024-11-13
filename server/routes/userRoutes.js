const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
require('dotenv').config();

// const isProtected = process.env.PROTECTED_ROUTES === 'true';
//
// if (isProtected) {
//     router.post('/users', userController.createUser);  // Public (sign-up)
//     router.get('/users', authenticateToken, userController.getAllUsers);  // Protected
//     router.get('/users/:id', authenticateToken, userController.getUserById);
//     router.put('/users/:id', authenticateToken, userController.updateUser);
//     router.delete('/users/:id', authenticateToken, userController.deleteUser);
// } else {
//     router.get('/users', userController.getAllUsers);
//     router.get('/users/:id', userController.getUserById);
//     router.put('/users/:id', userController.updateUser);
//     router.delete('/users/:id', userController.deleteUser);
// }

router.post('/users', userController.createUser);
router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

module.exports = router;