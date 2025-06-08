interface SidebarOptionProps {
    href: string;
    icon: string;
    text: string;   
    color?: string;
}

export default function SidebarOption({ href, icon, text, color }: SidebarOptionProps) {
    return (
        <a href={href} class={`flex items-center p-3 rounded-lg text-${color ?? "gray"}-700 hover:bg-gray-200 transition duration-300`}>
            <i class={`fas ${icon} mr-3`}></i>
            { text }
        </a>
    );
}