"use client"

import {
    PlusCircle,
    UploadCloud
} from 'lucide-react'
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { useCallback } from 'react'
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'


export default function FileDropzone() {

    const { toast } = useToast()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        let file: File = acceptedFiles[0]
        if (file.type === "application/pdf") {
            console.log(acceptedFiles[0])
        } else {
            toast({
                variant: "destructive",
                title: "Invalid file uploaded",
                description: "Please upload PDF file.",
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="group w-[256px] h-[169px] outline outline-gray-600 shadow-sm cursor-pointer hover:shadow-md hover:outline-gray-700"
                >
                    <PlusCircle size={32} className="text-gray-600 group-hover:text-gray-700" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[50%]">
                <DialogHeader>
                    <DialogDescription asChild>
                        <Card
                            {...getRootProps()}
                            className="w-full h-full flex flex-col items-center justify-center border outline-dotted cursor-pointer hover:outline-double"
                        >
                            <CardHeader>
                                <Input {...getInputProps()} />
                            </CardHeader>
                            <CardContent>
                                <div className="w-full flex flex-col items-center justify-center">
                                    <UploadCloud />
                                    <p className="text-base">
                                        {
                                            isDragActive ? (
                                                <span className="font-semibold">{"Drop the files here ..."}</span>
                                            ) : (

                                                <span className="flex gap-1 flex-col items-center justify-center">
                                                    <span className="font-semibold">Click to upload</span>
                                                    or
                                                    <span className="font-semibold">{"Drag 'n' drop some files here"}</span>
                                                </span>
                                            )
                                        }
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
