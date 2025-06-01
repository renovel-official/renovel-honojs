interface Session {
    id?: number;
    token: string;
    email: string;
    created_at?: string;
    last_logined_at?: number;
}

export default Session;