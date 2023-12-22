"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { deleteDocument, getDocuments } from '@/http';
import LoadingSpinner from "@/components/LoadingSpinner"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { signOut } from "next-auth/react"


type Props = {}

export default function FileList({ }: Props) {

    const router = useRouter()
    const query = useQuery({
        queryKey: "documents",
        queryFn: async () => {
            return await getDocuments()
        },
        onError: (error: any) => {
            if (error?.response?.status === 401 || error?.response?.status === 404) {
                signOut({
                    callbackUrl: "/"
                })
            }
        }
    })

    return (
        <>
            <>
                {
                    query.isLoading && (
                        <div className="flex gap-1 items-center justify-center">
                            <LoadingSpinner classname="h-6 w-6" />
                            loading...
                        </div>
                    )
                }
            </>
            <>
                {
                    query.data?.data?.documents?.map((document: any, index: number) => {
                        return (
                            <div key={index} className="h-fit flex items-center justify-centerborder">
                                <OpenCard document={document} />
                            </div>
                        )
                    })
                }
            </>
        </>
    )
}

function OpenCard({ document }: { document: any }) {

    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [documentTobeDeleted, setDocumentTobeDeleted] = React.useState<string>("");

    const documentDeleteMutation = useMutation({
        mutationFn: async (id: string) => {
            setDocumentTobeDeleted(id)
            return await deleteDocument(id)
        },
        onSuccess: (response) => {
            toast({
                title: response?.data?.message,
            })
            setDocumentTobeDeleted("")
            queryClient.invalidateQueries({ queryKey: "documents" })
        },
        onError: (error: any) => {
            setDocumentTobeDeleted("")
            toast({
                variant: "destructive",
                title: "Oh oh! Something went wrong,",
                description: error?.response?.data?.message ? error?.response?.data?.message : "Please try again later.",
            })
        }
    })

    return (
        <Card className="h-[192px] w-[256px] border shadow-sm cursor-pointer hover:shadow-lg hover:border-blue-200">
            <CardHeader>
                <Link href={`/documents/${document.id}`} className="break-words hover:text-blue-900">
                    <CardTitle className="text-lg">
                        {
                            document.documentname?.length <= 64
                                ? document.documentname
                                : document.documentname?.substring(0, 52) + ".. .pdf"
                        }
                    </CardTitle>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 break-words flex flex-col">
                        <span>{new Date(document.created_at).toLocaleDateString()},</span>
                        <span>{new Date(document.created_at).toLocaleTimeString()}</span>
                    </span>
                    <Button
                        onClick={() => {
                            documentDeleteMutation.mutate(document.id)
                        }}
                        variant="outline" className="rounded-full bg-red-100 hover:bg-red-200"
                    >
                        {
                            documentDeleteMutation.isLoading && document.id === documentTobeDeleted ? (
                                <LoadingSpinner color="red" classname="h-6 w-6" />
                            ) : (
                                <Trash2 color="red" />
                            )
                        }
                    </Button>
                </div>
            </CardContent>
        </Card >
    )
}
