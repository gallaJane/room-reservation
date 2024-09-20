import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | null | undefined;
            email: string | null | undefined;
            name?: string | null | undefined;
            accessToken?: string;
            accessTokenExpires?: number;
        } & DefaultSession["user"];
        error?: string;
    }

    interface User {
        id?: string;
        email?: string | null;
        name: string;
    }
}

declare module "next-auth" {
    interface JWT {
        id: string;
        email: string;
        name?: string | null | undefined;
        accessToken: string;
        accessTokenExpires: number;
        error?: string;
    }
}
