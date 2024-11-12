export type AuditLog = {
    id: number;
    action: string;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    task_id: number;
    user_id: number;
}