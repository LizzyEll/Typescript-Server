import printStart from "./screen";
import { Server, Address } from "./server";

printStart();

let address: Address = {
    hostname: "localhost",
    port: 3000,
};

const server = new Server(address);
server.start();

