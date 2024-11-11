const express = require('express');
const auditLogController = require('../controllers/auditLogController');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/audit-logs',authenticateToken, auditLogController.getAllAuditLogs);

module.exports = router;
