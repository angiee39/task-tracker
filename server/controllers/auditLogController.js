const { AuditLog } = require('../models');

// Get all audit logs
exports.getAllAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.findAll();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
