import path from "path"
import { Session } from "next-auth";
import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import s3WebService from "@/service/s3WebService";
import userService from "@/service/userService";
import documentsService from "@/service/documentsService";
import pineconeService from "@/service/pineconeService";


export async function GET(nextRequest: NextRequest, nextResponse: NextResponse) {

    try {
        // 1. check session     
        const session: Session | null = await getAuthSession()
        if (!session) {
            throw new Error("Unauthorized", {
                cause: "401"
            })
        }

        // 2. validate user 
        const user = await userService.getUsersByEmail(session.user.email!)
        if (!user) {
            throw new Error("User does not exists", {
                cause: "404"
            })
        }

        // 3. get document from user 
        const documentId: string = nextRequest.nextUrl.searchParams.get("id")!
        if (!documentId) {
            throw new Error("Invalid document id", {
                cause: "404"
            })
        }

        // 4. validate and delete document from database
        const document = await documentsService.getDocumentById(documentId)
        if (!document) {
            throw new Error("Invalid document id", {
                cause: "404"
            })
        }

        return new Response(
            JSON.stringify(
                {
                    "document": document
                }
            ),
            {
                status: 200
            }
        )

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

export async function DELETE(nextRequest: NextRequest, nextResponse: NextResponse) {

    try {
        // 1. check session     
        const session: Session | null = await getAuthSession()
        if (!session) {
            throw new Error("Unauthorized", {
                cause: "401"
            })
        }

        // 2. validate user 
        const user = await userService.getUsersByEmail(session.user.email!)
        if (!user) {
            throw new Error("User does not exists", {
                cause: "404"
            })
        }

        // 3. get document from user 
        const documentId: string = nextRequest.nextUrl.searchParams.get("id")!
        if (!documentId) {
            throw new Error("Invalid document id", {
                cause: "400"
            })
        }

        // 4. validate and delete document from database
        const document = await documentsService.deleteDocumentById(documentId)
        if (!document) {
            throw new Error("Invalid document id", {
                cause: "404"
            })
        }

        // 5. delete document from s3 bucket
        await s3WebService.deleteFileFroms3(document.key!)

        // 6. delete vector for the document from pinecone
        await pineconeService.deleteVectors(document.key)

        return new Response(
            JSON.stringify(
                {
                    "status": true,
                    "document": document,
                    "message": "Document deleted successfully."
                }
            ),
            {
                status: 200
            }
        )

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

export async function POST(nextRequest: NextRequest, nextResponse: NextResponse) {

    try {
        // 1. check session     
        const session: Session | null = await getAuthSession()
        if (!session) {
            throw new Error("Unauthorized", {
                cause: "401"
            })
        }

        // 2. validate user 
        const user = await userService.getUsersByEmail(session.user.email!)
        if (!user) {
            throw new Error("User does not exists", {
                cause: "404"
            })
        }

        // 3. get file from user 
        const body = await nextRequest.formData()
        const file: File | null = body.get("file") as File | null

        if (!file) {
            throw new Error("File not found, please try again.")
        }
        // 4. validate file type,size & user tier
        if (path.extname(file.name) !== ".pdf") {
            throw new Error("Invalid file type, please try again.", {
                cause: "400"
            })
        }

        if (file.size > parseInt(process.env.FILE_SIZE_LIMIT!)) {
            throw new Error("File size too large, please try again.", {
                cause: "401"
            })
        }

        // 5. upload file to s3 
        const uploadResponse = await s3WebService.upload(file)
        if (uploadResponse.error) {
            throw new Error()
        }
        // 6. save file details to db
        else if (uploadResponse.file_name && uploadResponse.file_name && !uploadResponse.error) {
            const docWritten = await documentsService.createDocument({
                file_name: uploadResponse.file_name,
                file_key: uploadResponse.file_key,
                userid: user.id!
            })
            if (!docWritten) {
                throw new Error()
            }

            // 7. return file details to use
            return new NextResponse(
                JSON.stringify({
                    id: docWritten.id,
                    file_key: docWritten.key,
                    file_name: docWritten.documentname,
                    created_at: docWritten.created_at!
                }),
                {
                    status: 200,
                }
            );

        }

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
