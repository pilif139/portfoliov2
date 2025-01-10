"use client"

import { ChangeEvent, Dispatch, forwardRef, InputHTMLAttributes, Ref, RefObject, SetStateAction, useState } from "react"
import { ZodSchema } from "zod"
import FormError from "../FormError"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    ref?: RefObject<HTMLInputElement> | undefined
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    errors?: string[] | string
    setErrors?: Dispatch<SetStateAction<string[]>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validateSchema?: ZodSchema
}

const Input = forwardRef(
    ({ className, label, id, onChange, errors, setErrors, validateSchema, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
        const [value, setValue] = useState("")

        const validate = (e: ChangeEvent<HTMLInputElement>) => {
            if (onChange) onChange(e)
            setValue(e.target.value)

            if (!validateSchema || !setErrors) return
            const validate = validateSchema.safeParse(e.target.value)
            if (!validate.success) {
                setErrors(validate.error.flatten().formErrors)
            } else {
                setErrors([])
            }
        }

        return (
            <>
                {label && (
                    <label htmlFor={id} className={`transition ${errors && errors.length > 0 ? "text-nord-11" : ""}`}>
                        {label}
                    </label>
                )}
                <input
                    className={`w-full p-2 rounded-xl transition outline-none bg-nord-1 text-nord-9 focus:bg-nord-2 ${errors && errors.length > 0 ? "border-4 border-nord-11" : ""} ${className}`}
                    ref={ref}
                    onChange={validate}
                    id={id}
                    value={value}
                    {...props}
                />
                {errors && <FormError errors={errors} />}
            </>
        )
    }
)
Input.displayName = "Input"

export default Input
