/* eslint-disable import/no-anonymous-default-export */
import md5 from "md5"
import { PineconeRecord } from "@pinecone-database/pinecone";
import { Document } from "@pinecone-database/doc-splitter";
import {
    OpenAIApi, Configuration, ResponseTypes, ErrorResponse,
    ChatCompletionRequestMessage
} from "openai-edge"


class OpenaiService {
    private openai: OpenAIApi | null = null;

    constructor() {
        try {

            const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY!
            if (!OPENAI_API_KEY) {
                throw new Error("OPENAI_API_KEY is not defined")
            }
            this.openai = new OpenAIApi(new Configuration({
                apiKey: OPENAI_API_KEY,
            }))

        } catch (error) {
            console.error(error)
            throw new Error("Openai current quota exceeded, please check your plan and billing details.")
        }
    }

    async createEmbedding(content: string) {

        const response = await this.openai?.createEmbedding({
            model: "text-embedding-ada-002",
            input: content,
        })
        if (response?.status != 200) {
            const result = await response?.json() as ErrorResponse
            console.error(result)
            throw new Error(result?.error?.message)
        }
        const result = await response?.json() as ResponseTypes["createEmbedding"]
        return result.data[0].embedding as number[]

    }

    async embedDocument(document: Document) {

        const hash: string = md5(document.pageContent)
        const embedding: number[] = await this.createEmbedding(document.pageContent)

        return {
            id: hash,
            values: embedding,
            metadata: {
                text: document.metadata?.text,
                pageNumber: document.metadata?.pageNumber,
            }
        } as PineconeRecord

    }

    async chatCompletion(messages: Array<ChatCompletionRequestMessage>) {

        return await this.openai?.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            stream: true
        }) as Response

    }

}


export default new OpenaiService();
