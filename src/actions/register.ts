'use server'

import * as z from 'zod';
import { SignUpSchema } from "@/schemas";
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

import bcryptjs from 'bcryptjs';

export const signUpUserRequest = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcryptjs.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "User already exists" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    return {
        success: 'User created!'
    }
}