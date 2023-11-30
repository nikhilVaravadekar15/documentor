import { Pinecone } from "@pinecone-database/pinecone"

let pinecone: Pinecone | null = null

export function getPineconeClient() {

    const PINECONE_DATABASE_ENVIRONMENT: string = process.env.PINECONE_DATABASE_ENVIRONMENT!
    const PINECONE_DATABASE_API_KEY: string = process.env.PINECONE_DATABASE_API_KEY!

    if (!PINECONE_DATABASE_ENVIRONMENT) {
        throw new Error("Pinecone database environment not defined")
    }
    if (!PINECONE_DATABASE_API_KEY) {
        throw new Error("Pinecone database api key not defined")
    }

    if (!pinecone) {
        pinecone = new Pinecone({
            apiKey: PINECONE_DATABASE_ENVIRONMENT!,
            environment: PINECONE_DATABASE_API_KEY!
        })
    }

    return pinecone
}
