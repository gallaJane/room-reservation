import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// import { loginUser } from "@/app/services/api/data/useAuth.api";
import { SignInSchema } from "@/schemas";


export const {
    handlers: { GET, POST },
    auth, signIn, signOut
} = NextAuth({

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                const validatedFields = SignInSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    if (!email || !password) {
                        throw new Error('Invalid credentials');
                    }
                }
                try {
                    // const { authToken, user } = await loginUser(credentials.email as string, credentials.password as string);

                    // if (!authToken || !user) {
                    //     throw new Error('Invalid credentials');
                    // }
                    // return { ...user, authToken, id: user.id.toString() };

                    // Return dummy user for now
                    return {
                        id: "1",
                        email: '',
                        name: "John",
                        authToken: "dummyAuthToken"
                    };

                } catch (e) {
                    return null;
                }
            },
        }),
        Google
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = `${user.name}`;
                token.accessToken = user.authToken;
                const decodedAccessToken = JSON.parse(Buffer.from(user.authToken.split(".")[1], "base64").toString());
                token.accessTokenExpires = decodedAccessToken.exp * 1000;
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
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
});
