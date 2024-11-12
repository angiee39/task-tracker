const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const AuditLog = sequelize.define('AuditLog', {
    action: {
        type: DataTypes.STRING,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    task_id: {
        type: DataTypes.INTEGER,
    },
});

// Define associations
AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AuditLog;
