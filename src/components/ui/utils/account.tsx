interface InputProps {
    name: string;
    type: string;
    placeholder: string;
}

function Input({ name, type, placeholder }: InputProps) {
    return (
        <input 
            type={type} 
            name={name} 
            id={name} 
            class="mt-2 w-full p-2 border border-2 border-gray-300 rounded" 
            placeholder={placeholder} 
        />
    )
}


interface SubmitButtonProps {
    children?: any;
    className?: string;
    disabled?: boolean;
}

function SubmitButton({ children, className, disabled = false }: SubmitButtonProps) {
    return (
        <button type="submit" class={`p-2 ${disabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white rounded ${className}`} disabled={disabled}>
            {children}
        </button>
    )
}

export { Input, SubmitButton };