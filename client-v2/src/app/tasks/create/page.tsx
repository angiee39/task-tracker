import {TaskCreateForm} from "../components/task-create-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const TaskCreate = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Create New Task</CardTitle>
                    <CardDescription>
                        Fill the details below to create a new task.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <TaskCreateForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskCreate;