import {resObject} from "@/lib/helpers";

export const getAllTasks = async () => {
    try {
        const res = await fetch('http://localhost:3003/' + 'api/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
};

export const getTaskById = async (id: number) => {
    try {
        const res = await fetch('http://localhost:3003/' + `api/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
};

export const createTask = async (task: any) => {
    try {
        const res = await fetch('http://localhost:3003/' + 'api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
            credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
};

export const updateTask = async (task: any) => {
    try {
        const res = await fetch('http://localhost:3003/' + `api/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
            credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        return resObject(false)
    }
};

export const deleteTask = async (id: number) => {
    try {
        const res = await fetch('http://localhost:3003/' + `api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!res.ok) {
            return resObject(false);
        }
        return resObject(true);
    } catch (error) {
        return resObject(false)
    }
};