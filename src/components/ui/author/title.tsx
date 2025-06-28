interface AuthorTitleProps {
    children: any;
}

export default function AuthorTitle({ children }: AuthorTitleProps) {
    return (
        <div class="text-3xl font-bold border-b pb-3 flex justify-between">
            { children }
        </div>
    );
}