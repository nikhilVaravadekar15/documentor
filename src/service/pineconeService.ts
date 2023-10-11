/* eslint-disable import/no-anonymous-default-export */
import { Pinecone } from '@pinecone-database/pinecone'
import { getPineconeClient } from "@/database/pinecone/index"

class PineconeService {
    private pinecone: Pinecone | null

    constructor() {
        this.pinecone = getPineconeClient()
    }
}


export default new PineconeService()
