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
    is_admin: number;
    created_at: string;
}

interface RoomResult {
    room: Room;
    users: Array<RoomUser>;
    messages: Array<Message>;
}

export type { Message, Room, RoomUser, RoomResult };