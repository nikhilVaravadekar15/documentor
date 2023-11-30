import path from "path"
import { Session } from "next-auth";
import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import s3WebService from "@/service/s3WebService";
import userService from "@/service/userService";
import documentsService from "@/service/documentsService";


export async function GET(nextRequest: NextRequest) {

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

        // 3. get documents by userid
        const documents = await documentsService.getDocumentsByUser(user.id!)
        return new Response(
            JSON.stringify(
                {
                    "length": documents.length,
                    "documents": documents
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
