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
}

function SubmitButton({ children, className }: SubmitButtonProps) {
    return (
        <button type="submit" class={`p-2 bg-blue-500 text-white rounded ${className}`}>
            {children}
        </button>
    )
}

export { Input, SubmitButton };