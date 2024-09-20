import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | null | undefined;
            email: string | null | undefined;
            name?: string | null | undefined;
            accessToken?: string;
            accessTokenExpires?: number;
            role: Role;
        } & DefaultSession["user"];
        error?: string;
    }

    interface User {
        id?: string;
        email?: string | null;
        name: string;
        role: Role
    }
}

declare module "next-auth" {
    interface JWT {
        id: string;
        email: string;
        name?: string | null | undefined;
        accessToken: string;
        accessTokenExpires: number;
        role: Role;
        error?: string;
    }
}
