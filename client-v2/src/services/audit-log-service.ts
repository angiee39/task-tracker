import {resObject} from "@/lib/helpers";

export const getAllAuditLogs = async () => {
    try {
        const res = await fetch('http://localhost:3003/' + 'api/audit-logs', {
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