import InfoBox from "./info-box";
import { NovelResult } from "@/interfaces/novel";

interface StatsDashboardProps {
    novels: NovelResult[];
}

export default function StatsDashboard({ novels }: StatsDashboardProps) {
    const totalViews = novels.reduce((sum, novel) => sum + (novel.view || 0), 0);
    const totalFollowers = novels.reduce((sum, novel) => sum + (novel.follower || 0), 0);
    const averageRating = novels.length > 0 ? 0 : 0; // 評価システムが実装されたら計算ロジックを追加

    return (
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <InfoBox 
                name="総作品数" 
                value={novels?.length.toString() || "0"} 
                color="blue" 
                icon="book"
            />
            <InfoBox 
                name="総閲覧数" 
                value={totalViews.toLocaleString()} 
                color="green" 
                icon="eye" 
            />
            <InfoBox 
                name="総お気に入り" 
                value={totalFollowers.toLocaleString()} 
                color="yellow" 
                icon="heart" 
            />
            <InfoBox 
                name="平均評価" 
                value={averageRating > 0 ? averageRating.toFixed(1) : "-"} 
                color="purple" 
                icon="star" 
            />
        </div>
    );
}
