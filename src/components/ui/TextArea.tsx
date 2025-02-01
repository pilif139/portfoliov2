"use client"

import { ChangeEvent, TextareaHTMLAttributes } from "react"
import FormError from "@/components/FormError"

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string
    label?: string
    name?: string
    id?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    errors?: string[] | string | null
}

export default function TextArea({ className, label, id, onChange, errors, ...props }: TextAreaProps) {
    return (
        <>
            {label && (
                <label htmlFor={id} className={`transition ${errors && errors.length > 0 ? "text-theme-11" : ""}`}>
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={`w-full p-2 rounded-xl transition outline-hidden bg-theme-3 text-theme-9 focus:bg-theme-2 min-h-max ${errors && errors.length > 0 ? "border-4 border-theme-11" : ""} ${className}`}
                onChange={onChange}
                {...props}
            />
            <FormError errors={errors} />
        </>
    )
}
