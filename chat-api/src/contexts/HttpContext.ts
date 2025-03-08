import { Request, Response } from "express";

export default class HttpContext<T> {
    request!: Request;
    response!: Response;
    payload!: T;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
        this.payload = request.body as T;
    }

    openStream() {
        this.response.setHeader('Content-Type', 'text/event-stream');
        this.response.setHeader('Cache-Control', 'no-cache');
        this.response.setHeader('Connection', 'keep-alive');
        this.response.flushHeaders();
    }

    endStream() {
        this.response.end();
    }

    static build<T>(request: Request, response: Response): HttpContext<T> {
        return new HttpContext<T>(request, response);
    }
}