/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database/pg";
import { documents } from "@/database/pg/schema";
import s3WebService from "./s3WebService";
import { eq } from "drizzle-orm";

class DocumentsService {
    constructor() { }

    async createDocument(
        { file_name, file_key, userid }: { file_name: string, file_key: string, userid: string }
    ) {
        return (await db.insert(documents).values(
            {
                documentname: file_name,
                key: file_key,
                url: s3WebService.getS3Url(file_key),
                userid: userid,
            }
        ).returning())[0]
    }

    async getDocumentById(
        documentid: string
    ) {
        return (await db.select().from(documents).where(eq(documents.id, documentid)))[0]
    }

}

export default new DocumentsService()
