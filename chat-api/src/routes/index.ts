import { Application } from "express";
import ai from './ai.routes';

const registerRoutes = (app: Application) => {
    app.use('/ai', ai);
}

export { registerRoutes }