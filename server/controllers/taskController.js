const pool = require('../config/db');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, status, priority, due_date, created_by, assigned_to } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, status, priority, due_date, created_by, assigned_to) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, description, status, priority, due_date, created_by, assigned_to]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
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
    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, due_date = $5, assigned_to = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
            [title, description, status, priority, due_date, assigned_to, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
