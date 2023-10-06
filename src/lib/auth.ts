import { db } from "@/database";
import { NextAuthOptions, getServerSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";

import type { JWT } from 'next-auth/jwt'
import type { DefaultSession, Session, User } from 'next-auth'


declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: User & {
            id: string
            username?: string | null
        }
    }

    interface jwt extends JWT {
        id: string
        username?: string | null
    }
}

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db),
    pages: {
        "signIn": "/"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (token) {
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.user.email = token.email as string
                session.user.image = token.picture as string
                session.user.username = token.username as string
            }
            return session
        },
        async signIn({ account, user, email, profile }) {
            // check db in user

            // try {
            //     if (!dbUser) {
            //         sendOnboardingMail
            //     } else {
            //         sendWelcomingBackMail
            //     }
            // } catch (error: any) {
            //     console.log(error);
            // }

            return true
        }

    }
}

export async function getAuthSession() {
    /**
     * https://next-auth.js.org/configuration/nextjs#unstable_getserversession
     */
    return await getServerSession(authOptions)
}
