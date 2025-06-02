interface LinkProps {
    href: string;
    children: any;
    className?: string;
}

export default function Link({ href, children, className }: LinkProps) {
    return (
        <a href={href} class={`text-blue-500 hover:text-blue-700 transition duration-300 ${className}`}>
            { children }
        </a>
    )
}