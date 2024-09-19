'use server';

import { AuthError } from "next-auth";
import { SignInSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import * as z from 'zod';


export const login = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: 'Invalid fields'
        };
    }
    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_SIGNIN_REDIRECT
        })
    }
    catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error;
    }
}