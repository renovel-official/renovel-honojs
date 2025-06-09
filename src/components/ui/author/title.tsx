interface AuthorTitleProps {
    children: string;
}

export default function AuthorTitle({ children }: AuthorTitleProps) {
    return (
        <div class="text-3xl font-bold border-b pb-3">
            {children}
        </div>
    );
}