import NextAuth from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from "@/auth.config";
import { Role } from "@prisma/client";

export const {
    handlers: { GET, POST },
    auth, signIn, signOut
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = `${user.name}`;
                token.role = user.role;
            }

            // Check if the access token has expired
            if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token is expired, but we're no longer refreshing it
            return token;  // Simply return the token without refreshing it
        },

        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.accessToken = token.accessToken as string;
            session.user.accessTokenExpires = Number(token.accessTokenExpires);
            session.error = token.error as string;
            session.user.role = token.role as Role
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",

    secret: process.env.AUTH_SECRET,
});
