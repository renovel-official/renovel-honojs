interface Message {
    id?: number;
    room_id: string;
    slug: string;
    author_id: string;
    text: string;
    created_at: string;
}

interface Room {
    id?: number;
    slug: string;
    title: string;
    created_at: string;
}

interface RoomUser {
    id?: number;
    room_id: string;
    user_id: string;
    is_admin: boolean;
    created_at: string;
}

export type { Message, Room, RoomUser };