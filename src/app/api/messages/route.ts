import openaiService from '@/service/openaiService';
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage } from 'openai-edge';
import pineconeService from '@/service/pineconeService';
import { Message, OpenAIStream, StreamingTextResponse } from 'ai'
import messageService from '@/service/messageService';


export async function POST(nextRequest: NextRequest, nextResponse: NextResponse) {

    try {

        let { documentid } = await nextRequest.json()
        if (!documentid) {
            throw new Error("All fields are required.", {
                cause: "404"
            })
        }

        const messages = await messageService.getMessages(documentid)
        return new NextResponse(
            JSON.stringify({
                messages: messages
            }),
            {
                status: 200,
            }
        );

    } catch (error: any) {
        console.error(error)
        return new Response(
            JSON.stringify(
                {
                    "message": error.message ? error.message : "Something went wrong, please try again."
                }
            ),
            {
                status: error.cause ? parseInt(error.cause) : 500
            }
        )
    }

}
