const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
require('dotenv').config();

// const isProtected = process.env.PROTECTED_ROUTES === 'true';
//
// if (isProtected) {
//     router.post('/login', authController.login);
//     router.post('/logout', authenticateToken, authController.logout);
// } else {
//     router.post('/login', authController.login);
//     router.post('/logout', authController.logout);
// }

router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
