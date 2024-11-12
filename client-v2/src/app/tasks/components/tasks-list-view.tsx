import { columns } from "./columns"
import { DataTable } from "./data-table"
import {getAllTasks} from "../../../services/task-service";
import {Task} from "../../../types/Task";
import {Button} from "@/components/ui/button";
import {ListChecks} from "lucide-react";
import Link from "next/link";

async function getData(): Promise<Task[]> {
    const data = await getAllTasks();
    return data.data
}

export default async function TasksListView() {

    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <Link href="/tasks/create">
                <Button>
                    <ListChecks /> Create New Task
                </Button>
            </Link>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
