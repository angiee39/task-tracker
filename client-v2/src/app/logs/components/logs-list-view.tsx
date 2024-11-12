import { columns } from "./columns"
import { DataTable } from "./data-table"
import {getAllAuditLogs} from "../../../services/audit-log-service";
import {AuditLog} from "../../../types/AuditLog";

async function getData(): Promise<AuditLog[]> {

    const data = await getAllAuditLogs();
    return data.data

}

export default async function AuditLogsListView() {

    const data = await getData()
    console.log("DATAAAAAAAAAAAA", data)

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}