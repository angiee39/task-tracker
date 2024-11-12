const express = require('express');
const notificationController = require('../controllers/notificationController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send-notifications', notificationController.sendNotifications);  // Public (sign-up)

module.exports = router;