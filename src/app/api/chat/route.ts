import openaiService from '@/service/openaiService';
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage } from 'openai-edge';
import pineconeService from '@/service/pineconeService';
import { Message, OpenAIStream, StreamingTextResponse } from 'ai'
import messageService from '@/service/messageService';


export async function POST(nextRequest: NextRequest, nextResponse: NextResponse) {

    try {

        let { messages, documentid, filekey } = await nextRequest.json()
        const lastMessage: ChatCompletionRequestMessage = messages[messages.length - 1]
        const context = pineconeService.getContext(lastMessage?.content!, filekey)

        const prompt = {
            role: "system",
            content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
                The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
                AI is a well-behaved and well-mannered individual.
                AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
                AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
                AI assistant is a big fan of Pinecone and Vercel.
                START CONTEXT BLOCK
                ${context}
                END OF CONTEXT BLOCK
                AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
                If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
                AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
                AI assistant will not invent anything that is not drawn directly from the context.
                `,
        };

        const response = await openaiService.chatCompletion([
            prompt,
            ...messages.filter((message: Message) => {
                return message.role !== "user"
            })
        ])
        const stream = OpenAIStream(response, {
            onStart: async () => {
                // This callback is called when the stream starts
                // You can use this to save the prompt to your database
                // await savePromptToDatabase(prompt)
                const message = await messageService.insertMessage(documentid, "user", lastMessage?.content!)
                if (!message) {
                    throw new Error("Error saving message", {
                        cause: "500"
                    })
                }

            },
            onToken: async (token: string) => {
                // This callback is called for each token in the stream
                // You can use this to debug the stream or save the tokens to your database
                console.log(token)
            },
            onCompletion: async (completion: string) => {
                // This callback is called when the stream completes
                // You can use this to save the final completion to your database
                // await saveCompletionToDatabase(completion)
                const message = await messageService.insertMessage(documentid, "system", completion)
                if (!message) {
                    throw new Error("Error saving message", {
                        cause: "500"
                    })
                }
            }
        })

        // Respond with the stream
        return new StreamingTextResponse(stream)

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
