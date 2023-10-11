import { Pinecone } from "@pinecone-database/pinecone"

let pinecone: Pinecone | null = null


export function getPineconeClient() {
    if (!process.env.PINECONE_DATABASE_ENVIRONMENT! && process.env.PINECONE_DATABASE_API_KEY!) {
        throw new Error("Pinecone environment or api-key not found")
    }
    if (!pinecone) {
        pinecone = new Pinecone({
            apiKey: process.env.PINECONE_DATABASE_ENVIRONMENT!,
            environment: process.env.PINECONE_DATABASE_API_KEY!
        })
    }

    return pinecone
}
