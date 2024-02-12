import { Request, Response } from "express";

export default function handleRequest(req: Request, res: Response): void {
    res.send('Hello, API!');
}