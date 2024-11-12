const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');
const notificationRoutes = require('./routes/notificationsRoute');
require('./models');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', // Replace with the origin of your front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', auditLogRoutes);
app.use('/api', notificationRoutes);

// Notifications cron job
require('./jobs/taskNotificationCron');

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
