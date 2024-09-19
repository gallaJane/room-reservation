import * as z from 'zod';
import {
    EMPTY_FIELD_MESSAGE,
    MIN_FIELD_LENGTH,
    MAX_STRING_LENGTH,
    MIN_PASS_LENGTH,
} from './types';

export const SignInSchema = z.object({
    email: z
        .string()
        .min(MIN_FIELD_LENGTH, { message: EMPTY_FIELD_MESSAGE })
        .email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(MIN_FIELD_LENGTH, { message: EMPTY_FIELD_MESSAGE })
        .max(MAX_STRING_LENGTH, {
            message: `Your password should not exceed ${MAX_STRING_LENGTH} characters.`,
        }),
});

export const SignUpSchema = z.object({
    name: z
        .string()
        .min(1, { message: EMPTY_FIELD_MESSAGE }),
    email: z
        .string()
        .min(MIN_FIELD_LENGTH, { message: EMPTY_FIELD_MESSAGE })
        .email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(MIN_PASS_LENGTH, { message: `Minimum ${MIN_PASS_LENGTH} characters required.` })
        .max(MAX_STRING_LENGTH, {
            message: `Your password should not exceed ${MAX_STRING_LENGTH} characters.`,
        }),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
export type ValidFieldNames = keyof SignInFormData;

export type SignUpFormData = z.infer<typeof SignUpSchema>;
export type ValidFieldNamesRegister = keyof SignUpFormData;
