const express = require('express');
const auditLogController = require('../controllers/auditLogController');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
require('dotenv').config();

// const isProtected = process.env.PROTECTED_ROUTES === 'true';
//
// if (isProtected) {
//     router.get('/audit-logs', authenticateToken, auditLogController.getAllAuditLogs);
// } else {
//     router.get('/audit-logs', auditLogController.getAllAuditLogs);
// }

router.get('/audit-logs', auditLogController.getAllAuditLogs);

module.exports = router;
