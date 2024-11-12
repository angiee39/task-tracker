const axios = require('axios');
const {User} = require("../models");

const ONESIGNAL_APPID = process.env.ONESIGNAL_APPID;
const ONESIGNAL_APIKEY = process.env.ONESIGNAL_APIKEY;
const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL;

exports.sendNotifications = async (req, res) => {
    try {
        const { message, userIds, } = req.body;
        const response = await sendNotificationAsync(message, userIds);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function sendNotificationAsync(message, userIds) {
    try {
        const onesignalUrl = 'https://onesignal.com/api/v1/notifications';

        const users = await User.findAll({
            where: {
                id: userIds,
                notification: true
            }
        });

        const filteredUserIds = users.map(user => user.id.toString());

        if (filteredUserIds.length === 0) {
            return 'Provided users not found or notifications are not enabled.';
        }

        const payload = {
            app_id: ONESIGNAL_APPID,
            contents: { en: message },
            target_channel: 'push',
            include_aliases: {
                external_id: filteredUserIds
            },
            url: BASE_CLIENT_URL,
        };

        const response = await axios.post(onesignalUrl, payload, {
            headers: {
                'Authorization': `Basic ${ONESIGNAL_APIKEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending notification:', error.response?.data || error.message);
        return error.response?.data || error.message;
    }
}