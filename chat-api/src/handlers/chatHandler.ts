import { PrismaClient } from "@prisma/client";
import HttpContext from "../contexts/HttpContext";

const prisma = new PrismaClient();


const handleChat = async (httpContext: HttpContext<Chat>): Promise<void> => {
    prisma.chat.create({
        data: {
            message: httpContext.request.body.message,
            role: "user"
        }
    })
    httpContext.openStream();
    const message = "Hello, World!";
    for(let char of message) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        httpContext.response.write(char);
    }
    httpContext.endStream();
}

type Chat = {
    message: string;
}
export type { Chat }

export { handleChat }