import fs from "fs"
import path from "path";
import { Session } from "next-auth";
import { TFilebody, TPdfPage } from "@/types";
import { getAuthSession } from "@/lib/auth";
import pdfservice from "@/service/pdfservice";
import userService from "@/service/userService";
import s3WebService from "@/service/s3WebService";
import documentsService from "@/service/documentsService";
import { NextRequest, NextResponse } from "next/server";
import embeddingService from "@/service/embeddingService";
import pineconeService from "@/service/pineconeService";


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

        // 3. get file_key from user 
        const body: TFilebody = await nextRequest.json()
        if (!body.file_key || !body.file_name || !body.id) {
            throw new Error("All fields are required", {
                cause: "400"
            })
        }

        // 4. verify file exists
        const document = await documentsService.getDocumentById(body.id!)
        if (!document) {
            throw new Error("Document does not exists", {
                cause: "404"
            })
        }

        // 5. read file from s3
        const fileBuffer: Buffer = await s3WebService.getFileFroms3(body.file_key!)
        if (!fileBuffer) {
            throw new Error("Document does not exists", {
                cause: "404"
            })
        }

        // 6. Define the file path
        const filePath = path.join(process.cwd(), process.env.TEMPORARY_FILE_DIR!, body.file_name);

        // 7. Check if the directory exists, if not, create it
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        // 8. Write content to the file
        fs.writeFileSync(filePath, fileBuffer);

        // 9. read pdf content (PDFloader)
        const pages: TPdfPage[] = await pdfservice.loadPdfContent(filePath)

        // 10. split and segment pages 
        const segmentedDocument = await Promise.all(pages.map(pdfservice.prepareSplittedDocument))

        // # ISSUE -  code: 'rate_limit_exceeded'
        // 11. create vector embedding of individual documents 
        const vectors = await Promise.all(segmentedDocument.flat().map((document) => embeddingService.embedDocument(document)));

        // // 12. save vectors to pinecone database
        // await pineconeService.saveVectors(body.file_name, vectors)

        return new NextResponse(
            JSON.stringify({
                message: "vectors created",
            }),
            {
                status: 200,
            }
        );

    }
    catch (error: any) {
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
