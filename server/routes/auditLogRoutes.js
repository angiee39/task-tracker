const express = require('express');
const auditLogController = require('../controllers/auditLogController');
const router = express.Router();

router.get('/audit-logs', auditLogController.getAllAuditLogs);

module.exports = router;
