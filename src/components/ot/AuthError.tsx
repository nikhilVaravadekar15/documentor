"use client"

import React from 'react'
import { useSearchParams, ReadonlyURLSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function AuthError() {
    const { toast } = useToast()
    const searchParams: ReadonlyURLSearchParams = useSearchParams()


    React.useEffect(() => {
        const error: string = searchParams.get("error")!
        if (error === "OAuthAccountNotLinked") {
            toast({
                variant: "destructive",
                title: "Uh oh! Unable to sign-in",
                description: "To confirm your identity, sign in with the same account you used originally.",
            })
        }
        if (error === "OAuthSignin") {
            console.log(error)
            toast({
                variant: "destructive",
                title: "Uh oh! Unable to sign-in",
                description: "We are extremely sorry, please try again later",
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <></>
    )
}
