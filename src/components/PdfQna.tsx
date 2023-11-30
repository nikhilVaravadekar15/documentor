"use client"

import React from 'react'
import Qna from '@/components/Qna';
import { useQuery } from 'react-query';
import { getDocumentbyId } from '@/http';
import PdfRenderer from '@/components/PdfRenderer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';


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
                            <Qna />
                        </div>
                    </>
                )
            }
        </>
    )
}
