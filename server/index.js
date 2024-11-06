const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');
require('./models');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', auditLogRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
