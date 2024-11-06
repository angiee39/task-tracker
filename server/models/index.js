const sequelize = require('../config/sequelize');
const User = require('./User');
const Task = require('./Task');
const AuditLog = require('./AuditLog');

// Sync all models with the database
(async () => {
    try {
        await sequelize.sync({ alter: true });  // alter: true will auto-update the schema
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync models:', error);
    }
})();

module.exports = {
    User,
    Task,
    AuditLog,
};
