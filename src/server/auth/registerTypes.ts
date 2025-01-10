import { z } from "zod"
import { LoginSchema } from "@/server/auth/loginTypes"

export const RegisterSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters long" })
            .max(30, { message: "Username must be at most 30 characters long" })
            .trim(),
    })
    .merge(LoginSchema)

export type FormState =
    | {
          errors?: {
              username?: string[]
              email?: string[]
              password?: string[]
          }
          message?: string
      }
    | undefined
