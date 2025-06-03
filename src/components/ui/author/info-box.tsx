interface InfoBoxProps {
    color: string;
    name: string;
    value: string;
}

export default function InfoBox({ color, name, value }: InfoBoxProps) {
    return (
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
                <div class={`bg-${color}-100 p-3 rounded-full`}>
                    <i class={`fas fa-book text-${color}-600 text-xl`}></i>
                </div>
                <div class="ml-4">
                    <h3 class="text-2xl font-bold text-gray-800">{ value }</h3>
                    <p class="text-gray-600 text-sm">{ name }</p>
                </div>
            </div>
        </div>
    );
}