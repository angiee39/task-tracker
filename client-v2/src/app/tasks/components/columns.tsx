"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Task } from "@/lib/tasks"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {format, parseISO} from "date-fns";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
        header: "Status",
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue ? cellValue === Number(filterValue) : true;
        },
        cell: ({ row }) => {
            const values = {
                1: "To Do",
                2: "In Progress",
                3: "Completed"
            };
            const value = row.getValue("status");
            return values[value] || "None"; // Fallback to "Unknown" if the value isn't 1, 2, or 3
        }

    },
    {
        accessorKey: "priority",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Priority
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return filterValue ? cellValue === Number(filterValue) : true;
        },
        cell: ({ row }) => {
            const values = {
                1: "High",
                2: "Medium",
                3: "Low"
            };
            const value = row.getValue("priority");
            return values[value] || "None"; // Fallback to "Unknown" if the value isn't 1, 2, or 3
        }
    },
    {
        accessorKey: "due_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Due Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value: any = row.getValue("due_date");
            const date = parseISO(value);
            return format(date, "dd/MM/yy HH:mm");
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(task.id.toString())}
                        >
                            Copy Task Id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
