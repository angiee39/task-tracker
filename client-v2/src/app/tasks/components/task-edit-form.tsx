"use client"

import { DayPicker } from 'react-day-picker';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"

import { toast } from "@/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon, Loader2} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {dayPickerClassNames} from "@/lib/day-picker-class-names";
import {useParams, useRouter} from "next/navigation";
import {getTaskById, updateTask} from "../../../services/task-service";
import {useUser} from "@/context/user-context";
import {useEffect, useState} from "react";
import {getAllUsers} from "../../../services/user-service";
import {useMutation} from "@tanstack/react-query";

const FormSchema = z.object({
    id: z.number(),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    status: z.number().min(1).max(3, {
        message: "Status must be between 1 and 3.",
    }),
    priority: z.number().min(1).max(3, {
        message: "Priority must be between 1 and 3.",
    }),
    due_date: z.date({
        required_error: "A date of birth is required.",
    }),
    created_by: z.number().positive({
        message: "Created by must be a positive number.",
    }),
    assigned_to: z.number().positive({
        message: "Assignee cannot be empty.",
    }),
})

export function TaskEditForm() {
    const { id } = useParams();
    const router = useRouter();
    const {user} = useUser();
    const [users, setUsers] = useState([]);
    const [assignee, setAssignee] = useState(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            status: 1,
            priority: 2,
            due_date: new Date(),
            assigned_to: 0
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, tasksRes] = await Promise.all([
                    getAllUsers(),
                    getTaskById(Number(id))
                ])

                // console.log("USERS RES", usersRes);
                console.log("TASKS RES", tasksRes);

                if (usersRes.isSuccess) {
                    setUsers(usersRes.data);
                }

                if (tasksRes.isSuccess) {
                    const taskData = tasksRes.data;
                    form.setValue('id', taskData.id);
                    form.setValue('title', taskData.title);
                    form.setValue('description', taskData.description);
                    form.setValue('status', taskData.status);
                    form.setValue('priority', taskData.priority);
                    form.setValue('due_date', new Date(taskData.due_date));
                    form.setValue('created_by', taskData.created_by);
                    form.setValue('assigned_to', taskData.assigned_to);
                    setAssignee(taskData.assigned_to);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutation.mutate(data);
    }

    const mutation = useMutation({
        mutationFn: (formData) => {
            return updateTask(formData);
        },
        onSuccess: (data, variables, context) => {
            if (data.isSuccess) {
                router.push('/tasks')
                toast({
                    title: "Task edited successfully.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "There was an error editing task.",
                })
            }
        },
        onError: (error, variables, context) => {
            console.error(error);
            toast({
                variant: "destructive",
                title: "There was an error editing task.",
            })
        },
    })

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Grocery shopping" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea  placeholder="Buy milk and eggs" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/*STATUS */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={field.value.toString()}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                <SelectItem value="1">To-do</SelectItem>
                                                <SelectItem value="2">In Progress</SelectItem>
                                                <SelectItem value="3">Done</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/*PRIORITY*/}
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={field.value.toString()}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                <SelectItem value="1">High</SelectItem>
                                                <SelectItem value="2">Medium</SelectItem>
                                                <SelectItem value="3">Low</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="due_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <DayPicker
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date("1900-01-01") || date < new Date()
                                            }
                                            initialFocus={false}
                                            classNames={dayPickerClassNames}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="assigned_to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Assign To</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        // value={field.value !== null ? String(field.value) : undefined}
                                        value={field.value || assignee || undefined}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Assignee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Assignees</SelectLabel>
                                                {users.map((allUser) => (
                                                    <SelectItem key={allUser.id} value={allUser.id}>
                                                        {allUser.id === user?.id ? "Me" : allUser.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {mutation.isPending ? (
                            <>
                                <Loader2 className="animate-spin" />
                                <span>Please wait</span>
                            </>
                        ) : (
                            <span>Submit</span>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
