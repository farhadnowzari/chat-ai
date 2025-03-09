import { PrismaClient } from "@prisma/client";
import HttpContext from "../contexts/HttpContext";
import ollama from 'ollama';

const prisma = new PrismaClient();


const handleChat = async (httpContext: HttpContext<Chat>): Promise<void> => {
    httpContext.openStream();
    const chats = (await prisma.chat.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    })).map(chat => ({ role: chat.role, content: chat.message }));
    const response = await ollama.chat({
        model: 'llama3.2:3b',
        messages: [
            {
                role: 'system',
                content: 'Your are a personal assistant. Your name is Jarvis!'
            },
            {
                role: 'system',
                content: 'Your owner\'s name is Tony Stark!'
            },
            {
                role: 'system',
                content: 'You also remember things. Everytime you are processing messages, the last user message is the recent one. So process all your messages and their messages to give better responses.'
            },
            ...chats,
            {
                role: 'user',
                content: httpContext.payload.message
            }
        ],
        stream: true
    })
    let aiResponse = '';
    for await (let chunk of response) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        httpContext.response.write(chunk.message.content);
        aiResponse += chunk.message.content;
    }
    httpContext.endStream();
    const instant = new Date();
    await prisma.chat.createMany({
        data: [
            {
                role: 'user',
                message: httpContext.payload.message,
                createdAt: instant
            },
            {
                role: 'assistant',
                message: aiResponse,
                createdAt: new Date(instant.getTime() + 1)
            }
        ]
    });
}

type Chat = {
    message: string;
}
export type { Chat }

export { handleChat }