import { db } from "@/database/pg/index";
import { NextAuthOptions, getServerSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { JWT, JWTEncodeParams } from 'next-auth/jwt'
import type { DefaultSession, Session, User } from 'next-auth'



declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: User & {
            id: string
        }
    }

    interface jwt extends JWT {
        id: string
    }
}

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db),
    session: {
        strategy: "jwt"
    },
    pages: {
        "signIn": "/"
    },
    secret: process.env.NEXTAUTH_SECRET!,
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
