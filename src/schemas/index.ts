import * as z from 'zod';
import {
    EMPTY_FIELD_MESSAGE,
    MIN_FIELD_LENGTH,
    MAX_STRING_LENGTH,
    MIN_PASS_LENGTH,
} from './types';

export const LoginSchema = z.object({
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

export const RegisterSchema = z.object({
    first_name: z
        .string()
        .min(1, { message: EMPTY_FIELD_MESSAGE }),
    last_name: z
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

export type LoginFormData = z.infer<typeof LoginSchema>;
export type ValidFieldNames = keyof LoginFormData;

export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type ValidFieldNamesRegister = keyof RegisterFormData;
