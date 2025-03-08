type ChatRole = 'user' | 'assistant';
type Chat = {
    message: string;
    role: ChatRole;
}

export type { ChatRole, Chat };