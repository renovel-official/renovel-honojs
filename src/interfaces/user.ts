import Role from "@/types/role";

interface User {
    id?: number;
    slug: string;
    name: string;
    email: string;
    password?: string;
    description: string;
    google_client_id?: string;
    created_at?: string;
    role: Role;
}

export default User;