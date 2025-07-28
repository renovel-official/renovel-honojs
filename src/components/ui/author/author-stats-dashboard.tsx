import InfoBox from "./info-box";

interface AuthorStats {
    worksCount: number;
    totalViews: number;
    followersCount: number;
    commentsCount: number;
}

interface AuthorStatsProps {
    stats: AuthorStats;
}

export default function AuthorStatsDashboard({ stats }: AuthorStatsProps) {
    return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <InfoBox 
                name="投稿作品数" 
                value={stats.worksCount.toString()} 
                color="blue"
            />
            <InfoBox 
                name="総閲覧数" 
                value={stats.totalViews.toLocaleString()} 
                color="green"
            />
            <InfoBox 
                name="フォロワー数" 
                value={stats.followersCount.toString()} 
                color="purple"
            />
            <InfoBox 
                name="コメント数" 
                value={stats.commentsCount.toString()} 
                color="orange"
            />
        </div>
    );
}
