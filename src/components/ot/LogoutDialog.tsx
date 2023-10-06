"use client"

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
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { LogOut } from "lucide-react"
import LoadingSpinner from "../LoadingSpinner"

export default function LogoutDialog() {
    const { data: session, status } = useSession()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="w-full p-2.5 flex items-center justify-start border-slate-500 rounded-md cursor-pointer bg-red-50 hover:bg-red-200">
                    <div className="text-red-500  flex gap-3 items-center justify-center">
                        <LogOut size={"1rem"} />
                        <span>Log out</span>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently log you out
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={status === "loading"}
                        className="bg-red-400 hover:bg-red-500"
                        onClick={() => signOut(
                            {
                                callbackUrl: "/"
                            }
                        )}
                    >
                        {
                            status === "loading" ? (
                                <LoadingSpinner
                                    color="red"
                                    classname="h-6 w-6"
                                />
                            ) : (
                                <>Continue</>
                            )
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
