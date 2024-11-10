const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');  // Import the User model for foreign key relationships

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.INTEGER,
    },
    priority: {
        type: DataTypes.INTEGER,
    },
    due_date: {
        type: DataTypes.DATE,
    },
});

// Define associations (foreign key relationships)
Task.belongsTo(User, { as: 'createdBy', foreignKey: 'created_by' });
Task.belongsTo(User, { as: 'assignedTo', foreignKey: 'assigned_to' });

module.exports = Task;
