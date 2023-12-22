/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database/pg";
import { messages } from "@/database/pg/schema";
import { eq } from "drizzle-orm";

class MessageService {

    async insertMessage(documentid: string, role: string, content: string) {
        return (await db.insert(messages).values({
            documentid: documentid,
            role: role,
            content: content
        }).returning())[0]
    }

    async getMessages(documentid: string) {
        return (await db.select().from(messages).where(eq(messages.documentid, documentid)))
    }
}

export default new MessageService();
