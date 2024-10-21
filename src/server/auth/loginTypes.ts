import {z} from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z.string(),
})

export type FormState = | {
    errors?: {
        email?: string[],
        password?: string[],
    };
    message?: string;
} | undefined;
