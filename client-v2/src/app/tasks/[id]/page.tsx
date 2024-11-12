import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TaskEditForm} from "../components/task-edit-form";

const TaskEdit = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Task</CardTitle>
                    <CardDescription>
                        Fill the details below to edit the task.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <TaskEditForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskEdit;