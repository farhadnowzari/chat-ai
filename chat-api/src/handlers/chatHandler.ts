import { PrismaClient } from "@prisma/client";
import HttpContext from "../contexts/HttpContext";
import ollama from 'ollama';

const prisma = new PrismaClient();


const handleChat = async (httpContext: HttpContext<Chat>): Promise<void> => {
    prisma.chat.create({
        data: {
            message: httpContext.request.body.message,
            role: "user"
        }
    })
    httpContext.openStream();
    
    const response = await ollama.chat({
        model: 'llama3.2:3b',
        messages: [
            {
                role: 'user',
                content: httpContext.payload.message
            }
        ],
        stream: true
    })

    for await (let chunk of response) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        httpContext.response.write(chunk.message.content);
    }
    httpContext.endStream();
}

type Chat = {
    message: string;
}
export type { Chat }

export { handleChat }