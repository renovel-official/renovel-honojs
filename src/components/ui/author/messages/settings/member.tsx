interface MemberBlockProps {
    me: string;
    username: string;
    role: number;
}

export default function MemberBlock({ me, username, role }: MemberBlockProps) {
    const permissionToRole = ["メンバー", "モデレーター", "管理者"];
    
    return (
        <div class="flex items-center justify-between p-4 border rounded-lg">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-gray-600"></i>
                </div>
                <div>
                    <div class="font-medium text-gray-800">{ username }</div>
                    <div class="text-sm text-gray-500">{ permissionToRole[role] }</div>
                </div>
            </div>

            <div class="flex items-center space-x-2">
                <select class="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" id={`${username}-role`} disabled={me === username} role={role}>
                    <option value={0} selected={role === 0}>メンバー</option>
                    <option value={1} selected={role === 1}>モデレーター</option>
                    <option value={2} selected={role === 2} disabled={role === 1}>管理者</option>
                </select>
                <button class="text-red-600 hover:text-red-800 p-2">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        </div>
    )
}