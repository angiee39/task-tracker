const { Task, AuditLog } = require('../models');

const isUnitTest = process.env.UNIT_TESTS === 'true';
const testUserId = 1;

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, status, priority, due_date, created_by, assigned_to } = req.body;
    const modifiedBy = isUnitTest ? testUserId : req.user.id;

    try {
        const newTask = await Task.create({
            title, description, status, priority, due_date, created_by, assigned_to
        })

        // Add an audit log entry
        await AuditLog.create({
            action: `Task(${newTask.id}) Created`,
            task_id: newTask.id,
            user_id: modifiedBy,
            timestamp: new Date()
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all components
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, due_date, assigned_to } = req.body;
    const modifiedBy = isUnitTest ? testUserId : req.user.id;

    try {
        const existingTask = await Task.findByPk(id);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Track which fields are being updated
        let updatedFields = [];

        if (title && title !== existingTask.title) updatedFields.push('title');
        if (description && description !== existingTask.description) updatedFields.push('description');
        if (status && status !== existingTask.status) updatedFields.push('status');
        if (priority && priority !== existingTask.priority) updatedFields.push('priority');
        if (due_date && due_date !== existingTask.due_date) updatedFields.push('due_date');
        if (assigned_to && assigned_to !== existingTask.assigned_to) updatedFields.push('assigned_to');

        const [updated] = await Task.update({ title, description, status, priority, due_date, assigned_to }, { where: { id } });

        if (updated) {
            const updatedTask = await Task.findByPk(id);

            // Add an audit log entry
            if (updatedFields.length > 0) {
                await AuditLog.create({
                    action: `Task(${id}) Updated: ${updatedFields.join(', ')}`,
                    task_id: id,
                    user_id: modifiedBy,
                    timestamp: new Date()
                });
            }

            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const modifiedBy = isUnitTest ? testUserId : req.user.id;
    try {
        const deleted = await Task.destroy({ where: { id } });
        if (deleted) {
            // Add an audit log entry
            await AuditLog.create({
                action: `Task(${id}) Deleted`,
                task_id: id,
                user_id: modifiedBy,
                timestamp: new Date()
            });
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
