import { columns } from "./columns"
import { DataTable } from "./data-table"
import {Task, tasksJson} from "@/lib/tasks";

async function getData(): Promise<Task[]> {
    // Fetch data from your API here.
    return tasksJson
}

export default async function TasksListView() {

    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
