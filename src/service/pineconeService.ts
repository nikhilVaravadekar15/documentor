/* eslint-disable import/no-anonymous-default-export */
import { Index, Pinecone, PineconeRecord, utils as pineconeUtils } from '@pinecone-database/pinecone'
import { getPineconeClient } from "@/database/pinecone/index"
import { convertToAscii } from '@/lib/utils'

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
        return await this.pineconeIndex?.upsert(vectors)
    }
}

export default new PineconeService()
