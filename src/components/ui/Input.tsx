import { ChangeEvent, forwardRef, InputHTMLAttributes, Ref, RefObject } from "react"

import FormError from "../FormError"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    ref?: RefObject<HTMLInputElement> | undefined
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    errors?: string[] | string
}

const Input = forwardRef(({ className, label, id, onChange, errors, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
        <>
            {label && (
                <label htmlFor={id} className={`transition ${errors && errors.length > 0 ? "text-nord-11" : ""}`}>
                    {label}
                </label>
            )}
            <input
                className={`w-full p-2 rounded-xl transition outline-none bg-nord-3 text-nord-9 focus:bg-nord-2 ${errors && errors.length > 0 ? "border-4 border-nord-11" : ""} ${className}`}
                ref={ref}
                onChange={onChange}
                id={id}
                {...props}
            />
            {errors && <FormError errors={errors} />}
        </>
    )
})
Input.displayName = "Input"

export default Input
