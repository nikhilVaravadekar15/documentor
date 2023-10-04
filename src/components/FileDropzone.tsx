"use client"

import {
    UploadCloud
} from "lucide-react"
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card"
import React, { useCallback } from 'react'
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"
import { useDropzone } from 'react-dropzone'


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
        <Card
            {...getRootProps()}
            className="w-fit h-fit border outline-dotted shadow-sm cursor-pointer hover:shadow-lg hover:outline-double"
        >
            <CardHeader>
                <Input {...getInputProps()} />
            </CardHeader>
            <CardContent>
                <div className="w-full flex flex-col items-center justify-center">
                    <UploadCloud />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
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
    )
}
