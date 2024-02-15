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

    constructor(address: Address) {
        // Create an Express instance
        this.application = express();
        this.address_ = address;
    }

    // Start the server
    public start(): void {
        console.log("Starting...");

        this.app.listen(this.address_.port, this.address_.hostname, () => {
            console.log(
                `Server is running at http://${this.address_.hostname}:${this.address_.port}`
            );
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
        this.address_ = address;
    }
}
