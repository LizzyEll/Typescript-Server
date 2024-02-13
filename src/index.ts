import printStart from "./screen";
import { Server, Address } from "./server";
import path from "path";

printStart();

let address: Address = {
    hostname: "localhost",
    port: 3000,
};

const server = new Server(address);
server.start();

// Example file route
server.setRoute("/", path.join(__dirname, "sites", "index.html"));