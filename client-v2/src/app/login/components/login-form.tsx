"use client"

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {loginUser} from "../../../services/auth-service";

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password cannot be empty.",
    })
})

export function LoginForm() {
    const router = useRouter();
    const { setUser } = useUser();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleLogin(data)
    }

    const handleLogin = async (credentials) => {
        try {
            const res = await loginUser(credentials);
            if (res.isSuccess) {
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                router.push('/tasks');
                toast({
                    description: "You have successfully logged in.",
                })
            } else {
                toast({
                    description: "There was an error logging in.",
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                description: "There was an error logging in.",
            })
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            {/*<FormDescription>*/}
                            {/*    This is your public display name.*/}
                            {/*</FormDescription>*/}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
