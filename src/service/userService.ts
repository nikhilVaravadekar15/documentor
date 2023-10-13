/* eslint-disable import/no-anonymous-default-export */
import { eq } from "drizzle-orm"
import { db } from "@/database/pg"
import { users } from "@/database/pg/schema"

class UserService {
    constructor() { }

    async getUsersByEmail(email: string) {
        return (await db.select().from(users).where(eq(users.email, email!)))[0]
    }

}

export default new UserService()
