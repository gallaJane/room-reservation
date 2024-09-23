import * as z from 'zod';
import {
    EMPTY_FIELD_MESSAGE,
    MIN_FIELD_LENGTH,
    MAX_STRING_LENGTH,
    MIN_PASS_LENGTH,
    MAX_CAPACITY,
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


export const AddRoomSchema = z.object({
    name: z
        .string()
        .min(1, { message: EMPTY_FIELD_MESSAGE }),
    capacity: z
        .number()
        .min(1, { message: "Capacity must be at least 1." })
        .max(MAX_CAPACITY, {
            message: `Capacity should not exceed ${MAX_CAPACITY}.`,
        }),
    amenities: z
        .array(z.string().min(1, { message: "Each amenity must be at least 1 character." }))
        .nonempty({ message: "There must be at least one amenity." }),
});

export const DateTimePickerSchema = z.object({
    datetime: z.date({
        required_error: 'Date is required!',
    }),
    startTime: z.string({
        required_error: 'Start time is required!',
    }),
    endTime: z.string({
        required_error: 'End time is required!',
    }),
})

export type SignInFormData = z.infer<typeof SignInSchema>;
export type ValidFieldNames = keyof SignInFormData;

export type SignUpFormData = z.infer<typeof SignUpSchema>;
export type ValidFieldNamesRegister = keyof SignUpFormData;

export type AddRoomFormData = z.infer<typeof AddRoomSchema>;
export type ValidFieldNamesAddRoomsForm = keyof AddRoomFormData;

export type DateTimePickerData = z.infer<typeof DateTimePickerSchema>;
export type ValidFieldNamesDateTimePickerForm = keyof DateTimePickerData;
