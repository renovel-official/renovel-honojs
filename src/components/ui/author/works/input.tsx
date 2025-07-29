import { HTMLInputTypeAttribute } from "react";

interface InputProps {
    value?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    [key: string]: any;
}

export default function Input({
    placeholder = "",
    type = "text",
    className = "w-full",
    ...props
}: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 ${className}`}
            required
            { ...props }
        />
    )
}