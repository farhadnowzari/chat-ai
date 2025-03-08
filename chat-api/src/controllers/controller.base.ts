import { Request, Response } from "express";

export default abstract class ControllerBase {
    request: Request;
    response: Response;
    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response        
    }
}