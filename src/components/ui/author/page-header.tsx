interface PageHeaderProps {
    title: string;
    description: string;
    actionText?: string;
    actionHref?: string;
    actionIcon?: string;
}

export default function PageHeader({ 
    title, 
    description, 
    actionText, 
    actionHref,
    actionIcon = "plus" 
}: PageHeaderProps) {
    return (
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                    <p class="text-gray-600">{description}</p>
                </div>
                {actionText && actionHref && (
                    <a 
                        href={actionHref} 
                        class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300 flex items-center"
                    >
                        <i class={`fas fa-${actionIcon} mr-2`}></i>
                        {actionText}
                    </a>
                )}
            </div>
        </div>
    );
}
