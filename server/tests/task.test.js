const request = require('supertest');
const app = require('../index');
const taskModel = require('../models/Task');
// const authenticateToken = require('../middleware/authMiddleware');

jest.mock('../models/Task');
// jest.mock('../middleware/authMiddleware', () => jest.fn((req, res, next) => {
//     req.user = { id: 1 };
//     next();
// }));


describe('Task API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/tasks should return a list of tasks', async () => {
        const mockTasks = [
            { id: 1, title: 'Test Task', description: 'Test Description', status: 1, priority: 1, due_date: '2024-11-13' }
        ];

        taskModel.findAll.mockResolvedValue(mockTasks);

        const response = await request(app).get('/api/tasks');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockTasks);
    });

    it('POST /api/tasks should create a new task', async () => {
        const newTask = { title: 'New Task', description: 'New Description', status: 1, priority: 1, due_date: '2024-11-14' };
        const createdTask = { ...newTask };

        taskModel.create.mockResolvedValue(createdTask);

        const response = await request(app)
            .post('/api/tasks')
            .send(newTask);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(createdTask);
    });

    it('GET /api/tasks/:id should return a specific task', async () => {
        const mockTask = { id: 6, title: 'Test Task', description: 'Test Description', status: 1, priority: 1, due_date: '2024-11-13' };

        taskModel.findByPk.mockResolvedValue(mockTask); // Mock fetching a task by ID

        const response = await request(app).get('/api/tasks/6');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockTask);
    });

    it('PUT /api/tasks/:id should update an existing task', async () => {
        const updatedTask = {
            id: 1,
            title: 'Updated Task',
            description: 'Updated Description',
            status: 2,
            priority: 1,
            due_date: '2024-11-15'
        };

        const mockExistingTask = {
            id: 1,
            title: 'Old Task',
            description: 'Old Description',
            status: 1,
            priority: 1,
            due_date: '2024-11-13'
        };

        taskModel.findByPk.mockResolvedValueOnce(mockExistingTask);

        taskModel.update.mockResolvedValue([1]);

        taskModel.findByPk.mockResolvedValueOnce(updatedTask);

        const response = await request(app)
            .put('/api/tasks/1')
            .send(updatedTask);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(updatedTask);
    });

    it('DELETE /api/tasks/:id should delete a specific task', async () => {
        taskModel.destroy.mockResolvedValue(1);

        const response = await request(app).delete('/api/tasks/1');
        expect(response.statusCode).toBe(204);
        expect(response.body).toEqual({});
    });
});
