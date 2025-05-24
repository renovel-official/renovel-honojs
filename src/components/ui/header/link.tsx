interface LinkProps {
    href: string;
    children: any;
}

export default function Link({ href, children }: LinkProps) {
    return (
        <a href={href} class="text-gray-700 hover:text-gray-900 transition duration-300">
            { children }
        </a>
    )
}