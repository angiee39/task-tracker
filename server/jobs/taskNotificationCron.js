const cron = require('node-cron');
const { Op } = require('sequelize');
const Task = require('../models/task'); // Assuming Task model is located in models folder
const axios = require('axios');

const BASE_SERVER_URL = process.env.BASE_SERVER_URL;
async function checkTasksAndSendNotifications() {
    try {
        const currentDate = new Date();
        const next24Hours = new Date();
        next24Hours.setHours(currentDate.getHours() + 24);

        const tasks = await Task.findAll({
            where: {
                due_date: {
                    [Op.between]: [currentDate, next24Hours]
                }
            }
        });

        if (tasks.length === 0) {
            console.log('No upcoming tasks due in the next 24 hours.');
            return;
        }

        for (const task of tasks) {
            const assignedUserId = task.assigned_to;

            const message = `You have task ${task.id} upcoming`;

            const response = await axios.post(BASE_SERVER_URL + '/send-notifications', {
                message: message,
                userIds: [assignedUserId]
            });

            console.log('Notification sent for task:', task.id, response.data);
        }

    } catch (error) {
        console.error('Error checking tasks or sending notifications:', error);
    }
}

cron.schedule('0 */2 * * *', () => {
    console.log('Running cron job to check for tasks due in the next 24 hours.');
    checkTasksAndSendNotifications();
});

// Running cron job immediately after server starts
checkTasksAndSendNotifications();