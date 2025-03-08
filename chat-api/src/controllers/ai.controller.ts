
import { Chat, handleChat } from '../handlers/chatHandler';
import HttpContext from '../contexts/HttpContext';
import ControllerBase from './controller.base';

export class AiController extends ControllerBase {

    public async chat(): Promise<void> {
        await handleChat(HttpContext.build(this.request, this.response));
    }
}