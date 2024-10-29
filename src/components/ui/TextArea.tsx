import { ChangeEvent } from "react";

type TextAreaProps = {
    className?: string;
    label?: string;
    name?: string;
    id?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

export default function TextArea({ className ,label,name, id, value, onChange, error } : TextAreaProps) {
    return (
        <>
            {label && <label htmlFor={id} className={`transition ${error ? 'text-nord-11' : ''}`}>{label}</label>}
            <textarea
                id={id}
                name={name}
                className={`w-full p-2 rounded-lg bg-nord-1 text-nord-9 transition outline-none focus:bg-nord-2 min-h-max ${error ? 'border-4 border-nord-11' : ''} ${className}`}
                value={value}
                onChange={onChange}
            />
            {error && <p className="text-nord-11">{error}</p>}
        </>
    )
}