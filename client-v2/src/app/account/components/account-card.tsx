'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useUser} from "@/context/UserContext";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";

export function AccountCard() {
    const { setUser, user } = useUser();
    const router = useRouter()

    const handleLogout = async () => {


        try {
            const res = await fetch('http://localhost:3003/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (res.ok) {
                setUser(null);
                localStorage.removeItem('user');
                router.push('/login');
            } else {
                // Handle error
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">

                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms"/>
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Allow Notifications
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Save</Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>Logout</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will be logged out of the application. You will need to log back in to access your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleLogout()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardFooter>
        </Card>
    )
}
