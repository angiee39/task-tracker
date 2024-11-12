export type Task = {
    id: number;
    title: string;
    description: string;
    status: number;
    priority: number;
    due_date: string;
    createdAt: string;
    updatedAt: string;
    created_by: number;
    assigned_to: number;
}