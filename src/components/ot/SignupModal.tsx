"use client"

import {
    ArrowBigRight
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


export default function SignupModal() {

    return (
        <Dialog>
            <DialogTrigger className="border-none outline-none">
                <Button
                    asChild
                    className="text-white font-bold bg-blue-400 border rounded-xl shadow-md cursor-pointer hover:bg-blue-500">
                    <div>
                        Get started
                        <ArrowBigRight size={20} />
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-normal">
                        <h2 className="text-center text-xl font-semibold leading-tight text-slate-800">
                            Sign up to get started
                        </h2>
                    </DialogTitle>
                    <DialogDescription>
                        <div className="py-12 flex flex-col gap-3 xl:mx-auto xl:max-w-sm">
                            <div className="flex gap-1 flex-wrap items-center justify-center text-center text-base text-gray-600">
                                By continuing, you are setting up a
                                <div className="w-fit flex items-center justify-center cursor-pointer">
                                    <Image
                                        src={"/apple-touch-icon.png"}
                                        alt="documentor-logo"
                                        width={16}
                                        height={16}
                                        draggable={false}
                                    />
                                    <span className="text-sm mt-1 font-semibold dark:text-white">
                                        Documentor
                                    </span>
                                </div>
                                account and agree to our
                                <span className="mx-1 inline-flex gap-1 cursor-pointer text-blue-500 hover:text-blue-700">
                                    Terms & Conditions
                                </span>
                                and
                                <span className="mx-1 inline-flex gap-1 cursor-pointer text-blue-500 hover:text-blue-700">
                                    Privacy Policy
                                </span>
                            </div>
                            <div className="mt-3 space-y-3">
                                <Button
                                    asChild type="button"
                                    className="w-full flex gap-2 items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 cursor-pointer hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                >
                                    <div>
                                        <Image
                                            alt="google"
                                            draggable={false}
                                            width={20} height={20}
                                            src={"/icon-google.svg"}
                                        />
                                        <span>Sign up with Google</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
