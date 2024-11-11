const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

// POST /api/login - Login endpoint
router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
