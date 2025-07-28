interface QuickAction {
    title: string;
    description: string;
    href: string;
    icon: string;
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
}

interface QuickActionsProps {
    actions?: QuickAction[];
}

const defaultActions: QuickAction[] = [
    {
        title: "新しい作品",
        description: "作品を投稿する",
        href: "/author/works/new",
        icon: "plus",
        color: "blue"
    },
    {
        title: "ブログ投稿",
        description: "日記を書く",
        href: "/author/blogs/new",
        icon: "blog",
        color: "green"
    },
    {
        title: "設定",
        description: "プロフィール編集",
        href: "/author/setting",
        icon: "cog",
        color: "purple"
    },
    {
        title: "メッセージ",
        description: "読者との交流",
        href: "/author/messages",
        icon: "envelope",
        color: "orange"
    }
];

export default function QuickActions({ actions = defaultActions }: QuickActionsProps) {
    const getColorClass = (color: string) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-100 text-blue-600';
            case 'green':
                return 'bg-green-100 text-green-600';
            case 'purple':
                return 'bg-purple-100 text-purple-600';
            case 'orange':
                return 'bg-orange-100 text-orange-600';
            case 'red':
                return 'bg-red-100 text-red-600';
            case 'yellow':
                return 'bg-yellow-100 text-yellow-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-bolt text-gray-600 mr-2"></i>
                クイックアクション
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, index) => (
                    <a 
                        key={index}
                        href={action.href} 
                        class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300"
                    >
                        <div class={`p-3 rounded-full mr-4 ${getColorClass(action.color)}`}>
                            <i class={`fas fa-${action.icon}`}></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">{action.title}</h3>
                            <p class="text-sm text-gray-600">{action.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
