"use client"

import {
    Send
} from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Message, useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import { Input } from "@/components//ui/input"
import { useQuery } from 'react-query'
import { getMessageByDocumentId } from '@/http'
import { Skeleton } from "@/components/ui/skeleton"



type Props = {
    documentid: string
    filekey: string
}

export default function Chat({ documentid, filekey }: Props) {

    const { data: session, status } = useSession()
    const { data: response, isLoading } = useQuery("messages", async () => {
        return await getMessageByDocumentId(documentid)
    })

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
        body: {
            documentid: documentid,
            filekey: filekey,
        },
        initialMessages: response?.data.messages || []
    })

    return (
        <div className="relative flex-grow h-full w-full flex flex-col">
            {
                isLoading ? (
                    <>
                        <Skeleton className="h-20 w-full bg-blue-500/10 shadow-black" />
                        <Skeleton className="h-36 w-full delay-75 bg-blue-600/10 shadow-black" />
                        <Skeleton className="h-20 w-full bg-blue-500/10 shadow-black" />
                        <Skeleton className="h-36 w-full delay-75 bg-blue-600/10 shadow-black" />
                        <Skeleton className="h-20 w-full bg-blue-500/10 shadow-black" />
                        <Skeleton className="h-36 w-full delay-75 bg-blue-600/10 shadow-black" />
                    </>
                ) : (
                    <>
                        <div className="relative w-full flex-grow overflow-y-scroll">
                            <div className="w-full flex flex-col items-center justify-center">
                                {
                                    messages.map((message: Message, index: number) => {
                                        return (
                                            <div
                                                key={message.id}
                                                className={cn(
                                                    "p-4 w-full",
                                                    message.role === "user" ? "bg-slate-50" : "bg-blue-100"
                                                )}
                                            >
                                                <div className="flex gap-3 text-base">
                                                    <Image
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                        draggable={false}
                                                        className="h-6 w-6 rounded cursor-pointer"
                                                        src={message.role === "user" ? `${session?.user.image}` : "/apple-touch-icon.png"}
                                                    />
                                                    <div className={cn(
                                                        "text-base",
                                                        message.role === "user" ? "text-slate-900" : "text-slate-700"
                                                    )}>
                                                        {message.content}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <form
                            className="flex items-center justify-evenly py-2 rounded-lg shadow-[35px_35px_60px_15px_rgba(0,0,0,0.3)]"
                            onSubmit={handleSubmit}
                        >
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Enter your question (max 1000 characters)"
                                className="min-h-[48px] ml-4 mr-2 p-2 w-full text-sm text-gray-900 rounded-lg border-2 focus-within:outline-none focus-visible:ring-0 "
                            />
                            <Button
                                type={"submit"}
                                variant={"outline"} className="p-2 mr-4 cursor-pointer hover:text-blue-600"
                            >
                                <Send size={20} />
                            </Button>
                        </form>
                    </>
                )
            }
        </div>
    )
}
