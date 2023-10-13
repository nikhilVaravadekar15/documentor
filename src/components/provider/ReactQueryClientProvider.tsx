"use client"

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import React from 'react'

export default function ReactQueryClientProvider({
    children,
}: {
    children: React.ReactNode
}) {

    // Create a client
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
