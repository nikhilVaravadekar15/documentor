/* eslint-disable import/no-anonymous-default-export */
import {
    Index, Pinecone, PineconeRecord,
} from '@pinecone-database/pinecone'
import { convertToAscii } from '@/lib/utils'
import openaiService from '@/service/openaiService'
import { TQualifyingDocumentMetadata } from '@/types'
import { getPineconeClient } from "@/database/pinecone/index"


class PineconeService {
    private pinecone: Pinecone | null
    private pineconeIndex: Index | null

    constructor() {

        const PINECONE_DATABASE_INDEX_NAME: string = process.env.PINECONE_DATABASE_INDEX_NAME!

        if (!PINECONE_DATABASE_INDEX_NAME) {
            throw new Error("Pinecone index name not defined")
        }
        this.pinecone = getPineconeClient()
        this.pineconeIndex = this.pinecone?.index(PINECONE_DATABASE_INDEX_NAME)
    }

    async saveVectors(filename: string, vectors: PineconeRecord[]) {
        const namespace: string = convertToAscii(filename)
        const nsindex = this.pineconeIndex?.namespace(namespace);
        return await nsindex?.upsert(vectors)
    }

    async getMatchesFromEmbeddings(filekey: string, embeddings: number[]) {

        try {
            const namespace: string = convertToAscii(filekey)
            const nsindex = this.pineconeIndex?.namespace(namespace);
            const queryresult = await nsindex?.query({
                topK: 5,
                includeMetadata: true,
                vector: embeddings,
            })

            return queryresult?.matches
        } catch (error) {
            console.error(error)
            throw new Error(error as string)
        }
    }

    async getContext(query: string, fileKey: string) {
        const queryEmbeddings = await openaiService.createEmbedding(query);
        const matches = await this.getMatchesFromEmbeddings(fileKey, queryEmbeddings);

        const qualifyingDocs = matches?.filter((match) => {
            return match.score && match.score > 0.7
        });

        let docs = qualifyingDocs?.map((match) => {
            return (match.metadata as TQualifyingDocumentMetadata).text
        });

        // 5 vectors
        return docs?.join("\n").substring(0, 3000);

    }
}

export default new PineconeService()
