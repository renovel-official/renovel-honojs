interface EmptyStateProps {
    title: string;
    description: string;
    actionText: string;
    actionHref: string;
    icon?: string;
}

export default function EmptyState({ 
    title, 
    description, 
    actionText, 
    actionHref,
    icon = "book" 
}: EmptyStateProps) {
    return (
        <div class="p-12 text-center">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class={`fas fa-${icon} text-4xl text-gray-400`}></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p class="text-gray-600 mb-6">{description}</p>
            <a 
                href={actionHref} 
                class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300 inline-flex items-center"
            >
                <i class="fas fa-plus mr-2"></i>
                {actionText}
            </a>
        </div>
    );
}
