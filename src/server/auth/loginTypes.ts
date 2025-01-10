import { z } from "zod"

export const LoginSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be atleast 3 characters long" })
        .max(255, { message: "Email must be at most 255 characters long" })
        .trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(255, { message: "Password must be at most 255 characters long" }),
})

export type FormState =
    | {
          errors?: {
              email?: string[]
              password?: string[]
          }
          message?: string
      }
    | undefined
