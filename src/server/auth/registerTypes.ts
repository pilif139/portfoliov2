import {z} from 'zod';

export const RegisterSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(30, { message: 'Username must be at most 30 characters long' })
        .trim(),
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z
      .string()
      .min(6, {message: "Password must be at least 6 characters long"})
      .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
      .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
      .regex(/[0-9]/, {message: "Password must contain at least one number"})
      .trim(),
})

export type FormState = | {
    errors?: {
        username?: string[],
        email?: string[],
        password?: string[],
    };
    message?: string;
} | undefined;
