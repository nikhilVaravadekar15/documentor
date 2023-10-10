import path from "path"
import { db } from "@/database";
import { documents, users } from "@/database/schema";
import { getAuthSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import s3WebService from "@/service/s3WebService";
import { FullQueryResults } from "@neondatabase/serverless";


export async function POST(nextRequest: NextRequest) {

    // 1. check session     
    const session = await getAuthSession()
    if (!session) {
        return new NextResponse(
            JSON.stringify({
                "message": "Unauthorized",
            }),
            {
                status: 401,
            }
        );
    }

    try {
        // 2. validate user 
        const user = (await db.select().from(users).where(eq(users.email, session.user.email!)))[0]
        if (!user) {
            return new NextResponse(
                JSON.stringify({
                    "message": "User does not exists",
                }),
                {
                    status: 404,
                }
            );
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
        if (user.tier === "premium") {
            if (file.size > parseInt(process.env.TIER_PREMIUM_FILE_SIZE_LIMIT!)) {
                throw new Error("File size too large, please try again.", {
                    cause: "401"
                })
            }
        }
        if (user.tier === "free") {
            if (file.size > parseInt(process.env.TIER_FREE_FILE_SIZE_LIMIT!)) {
                throw new Error("File size too large, please try again.", {
                    cause: "401"
                })
            }
        }

        // 5. upload file to s3 
        const uploadResponse = await s3WebService.upload(file)
        if (uploadResponse.error) {
            throw new Error()
        }
        // 6. save file details to db
        else if (uploadResponse.file_name && uploadResponse.file_name && !uploadResponse.error) {
            const docWritten = (await db.insert(documents).values([
                {
                    documentname: uploadResponse.file_key,
                    key: uploadResponse.file_key,
                    url: s3WebService.getS3Url(uploadResponse.file_key),
                    userid: user.id,
                }
            ]).returning())[0]
            if (!docWritten) {
                throw new Error()
            }

            console.log(docWritten)
            return new NextResponse(
                JSON.stringify({
                    id: docWritten.id,
                }),
                {
                    status: 200,
                }
            );

        }

        // then read file again from s3
        // then read pdf content (PDFloader)
        // then create vector embedding 
        // return 


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


    return new NextResponse(
        JSON.stringify({
            message: "Hello World!",
        }),
        {
            status: 200,
        }
    );
}
