interface LinkProps {
    href: string;
    children: any;
}

export default function Link({ href, children }: LinkProps) {
    return (
        <a href={href} class="text-gray-400 hover:text-gray-600 transition duration-300">
            { children }
        </a>
    )
}