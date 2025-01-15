import { ChangeEvent, forwardRef, InputHTMLAttributes, Ref, RefObject } from "react"

import FormError from "../FormError"
import clsx from "clsx"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    ref?: RefObject<HTMLInputElement> | undefined
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    errors?: string[] | string | null
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
                className={clsx(
                    `w-full p-2 rounded-lg transition outline-none bg-nord-3 text-nord-9 focus:bg-nord-2 file:bg-nord-1 file:text-white file:rounded-xl file:border-none file:px-6 file:py-1 file:transition file:outline-none file:focus:bg-nord-0 file:hover:bg-nord-0 file:cursor-pointer file:mr-4`,
                    errors && errors.length > 0 ? "border-4 border-nord-11" : "",
                    className
                )}
                ref={ref}
                onChange={onChange}
                id={id}
                {...props}
            />
            <FormError errors={errors} />
        </>
    )
})
Input.displayName = "Input"

export default Input
