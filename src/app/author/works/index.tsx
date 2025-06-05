import { Novel } from "@/interfaces/novel";

interface AuthorNovelProps {
    novels: Array<Novel>;
}

export default function AuthorWorks({ novels }: AuthorNovelProps) {
    return (
        <div>
            <h1>Works</h1>
        </div>
    );
}