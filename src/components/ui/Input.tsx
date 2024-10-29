import { ChangeEvent, forwardRef, Ref, RefObject } from "react";

type InputProps = {
    className?: string;
    label?: string;
    type: string;
    name?: string;
    id?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    ref?: RefObject<HTMLInputElement> | undefined;
    error?: string;
}

const Input = forwardRef(({
    className, label, type, name, id, value, onChange, accept, error
}: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
        <>
            {label && <label htmlFor={id} className={`transition ${error ? 'text-nord-11' : ''}`}>{label}</label>}
            <input
                type={type}
                id={id}
                name={name}
                className={`w-full p-2 rounded-lg bg-nord-1 text-nord-9 transition outline-none focus:bg-nord-2 ${error ? 'border-4 border-nord-11' : ''} ${className}`}
                value={value}
                accept={accept}
                ref={ref}
                onChange={onChange}
            />
            {error && <p className="text-nord-11">{error}</p>}
        </>
    );
});
Input.displayName = 'Input';

export default Input;