import { z } from "zod"

export const titleSchema = z
    .string()
    .min(3, "Title must be atleast 3 characters long")
    .max(150, "Title must be at most 150 characters long")
export const descriptionSchema = z
    .string()
    .min(7, "Description must be atleast 7 characters long")
    .max(250, "Description must be at most 250 characters long")
