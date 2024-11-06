const pool = require('../config/db');

// Get all audit logs
exports.getAllAuditLogs = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM audit_logs');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
