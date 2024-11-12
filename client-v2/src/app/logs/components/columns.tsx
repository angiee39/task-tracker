"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AuditLog } from "../../../types/AuditLog"

export const columns: ColumnDef<AuditLog>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "user_id",
        header: "User ID",
    },
    {
        accessorKey: "action",
        header: "Action"
    },
    {
        accessorKey: "timestamp",
        header: "Time",
    },
    {
        accessorKey: "task_id",
        header: "Task ID",

    },
]
