import { ZodSchema } from "zod"
import { useState } from "react"

// Hook that given a zod schema will return an array of errors, setter for errors and a function with which you can run validation for example on change of input value
export default function useValidate<T>(validateSchema: ZodSchema, value: T) {
    const [errors, setErrors] = useState<string[] | null>([])

    const validate = (val?: T) => {
        const parse = validateSchema.safeParse(val || value)
        if (!parse.success) {
            setErrors(parse.error.flatten().formErrors)
        } else {
            setErrors(null)
        }
    }

    return [errors, setErrors, validate] as const
}
