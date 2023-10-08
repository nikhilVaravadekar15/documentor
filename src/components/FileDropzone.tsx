"use client"

import {
    BadgeCheck,
    PlusCircle,
    UploadCloud,
    ArrowBigRight
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
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import LoadingSpinner from './LoadingSpinner'
import s3WebService from "@/service/s3WebService"


export default function FileDropzone() {

    const { toast } = useToast()
    const [isUploaded, setIsUploaded] = useState<boolean>(false)

    const onFileDrop = useCallback(async (acceptedFiles: File[]) => {
        let file: File = acceptedFiles[0]
        if (file.type === "application/pdf") {
            try {
                const data = await s3WebService.upload(file)
                if (data?.file_key && data?.file_name) {
                    if (!data.error) {
                        setIsUploaded(true)
                    } else {
                        throw new Error(data.error)
                    }
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Oh oh! Something went wrong,",
                    description: "Please try again later.",
                })
            }
        } else {
            toast({
                variant: "destructive",
                title: "Invalid file uploaded",
                description: "Please upload PDF file.",
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [".pdf"]
        },
        maxFiles: 1,
        onDrop: onFileDrop,
    })

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
                        {
                            acceptedFiles.length === 0 ? (
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
                            ) : (
                                isUploaded ? (
                                    <Card
                                        className="w-full h-full flex flex-col items-center justify-center border outline cursor-pointer"
                                    >
                                        <CardContent className="flex gap-2 flex-col items-center justify-center">
                                            <div className="flex text-green-900 gap-2 items-center justify-center">
                                                <BadgeCheck />
                                                Uploaded successfully
                                            </div>
                                            <Button
                                                asChild variant={"outline"}
                                                className="flex gap-1 items-center justify-center border-2 text-gray-700 hover:text-gray-800"
                                            >
                                                <Link href={`/documents/1234567ytrewq2345tgfd`} target="_blank">
                                                    Start chatting with your pdf document
                                                    <ArrowBigRight size={20} />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Card
                                        className="w-full h-full flex flex-col items-center justify-center border outline cursor-pointer"
                                    >
                                        <CardContent className="flex gap-2 flex-col items-center justify-center">
                                            <div className="flex gap-2 items-center justify-center text-base">
                                                <LoadingSpinner
                                                    color="darkgray"
                                                    classname="w-6 h-6"
                                                />
                                                Uploading
                                            </div>
                                            <p className="text-base text-blue-900">
                                                {
                                                    acceptedFiles[0].name.length >= 56 ? (
                                                        acceptedFiles[0].name.slice(0, 50) + "...pdf"
                                                    ) : (
                                                        acceptedFiles[0].name
                                                    )
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                )
                            )
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    )
}
