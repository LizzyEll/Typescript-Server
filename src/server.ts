import express, { Express, Request, Response } from "express";
import path from "path";
import fs from "fs";

// Define the address type
export interface Address {
    hostname: string;
    port: number;
}

// Define the server class
export class Server {
    private application: Express;
    private address_: Address;
    private routes: Map<
        string,
        string | ((req: Request, res: Response) => void)
    >;

    constructor(address: Address) {
        // Create an Express instance
        this.application = express();
        this.address_ = address;
        this.routes = new Map<string, (req: Request, res: Response) => void>();
    }

    // Start the server
    public start(): void {
        console.log("Starting...");

        this.app.listen(this.address_.port, this.address_.hostname, () => {
            console.log(
                `Server is running at http://${this.address_.hostname}:${this.address_.port}`
            );
        });

        this.app.all("/*", (req, res) => {
            this.handleRoute(req, res);
        });
    }

    public stop(): void {
        console.log("Stopping...");
    }

    public get app(): Express {
        return this.application;
    }

    public get address(): Address {
        return this.address_;
    }

    public set address(address: Address) {
        this.stop();
        this.address_ = address;
        this.start();
    }

    public setRoute(
        path: string,
        handler: string | ((req: Request, res: Response) => void)
    ): void {
        this.routes.set(path, handler);
    }

    private send404(res: Response): void {
        res.status(404).send("Not Found");
    }

    private handleRoute(req: Request, res: Response): void {
        // Check if the path is an API path
        // If it is, route to the file
        let handler = this.routes.get(req.path);
        switch (typeof handler) {
            case "function":
                handler(req, res);
                break;
            case "string":
                
                let path_ = path.parse(path.join(__dirname, handler));
                handler = path.join(path_.dir, path_.base);
                if (path_.ext != ".ts") {
                    if (req.method != "GET") this.send404(res);
                    fs.existsSync(handler)
                        ? res.sendFile(handler)
                        : this.send404(res);
                    break;
                }
                import(handler).then((module) => {
                    module.default(req, res);
                });
                break;
            default:
                this.send404(res);
                break;
        }
    }
}
