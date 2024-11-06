const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Task = require('./Task');
const User = require('./User');

const AuditLog = sequelize.define('AuditLog', {
    action: {
        type: DataTypes.STRING,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Define associations
AuditLog.belongsTo(Task, { foreignKey: 'task_id' });
AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AuditLog;
