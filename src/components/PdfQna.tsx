"use client"

import React from 'react'
import Chat from '@/components/Chat';
import { useQuery } from 'react-query';
import { getDocumentbyId } from '@/http';
import { useRouter } from 'next/navigation';
import PdfRenderer from '@/components/PdfRenderer';
import LoadingSpinner from '@/components/LoadingSpinner';


type Props = {
    slug: string
}

export default function PdfQna({ slug }: Props) {

    const router = useRouter()
    const query = useQuery({
        queryKey: "document",
        queryFn: async () => {
            return await getDocumentbyId(slug)
        },
        onError: (error) => {
            router.push("/not-found")
        }
    })

    return (
        <>
            {
                query.isLoading ? (
                    <div className="flex gap-1 items-center justify-center">
                        <LoadingSpinner classname="h-6 w-6" />
                    </div>
                ) : (
                    <>
                        <div className="h-[50%] w-full border md:h-full md:w-[50%]">
                            <PdfRenderer url={query.data?.data?.document?.url} />
                        </div>
                        <div className="h-[50%] w-full border md:h-full md:w-[50%]">
                            <Chat
                                documentid={query.data?.data?.document?.id}
                                filekey={query.data?.data?.document?.key}
                            />
                        </div>
                    </>
                )
            }
        </>
    )
}
