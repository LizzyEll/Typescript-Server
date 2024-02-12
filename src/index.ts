import printStart from './screen';
import { Server, Address } from './server';

printStart();

let address: Address = {
    hostname: 'localhost',
    port: 3000
};



const server = new Server(address);

server.start();

// Example Route for Index
server.setRoute('/', (req, res) => {
    res.send('Hello, World!');
});

// API Route
server.setRoute('/api/index', './api/index');

// Example Route for Home
server.setRoute('/home', (req, res) => {
    res.send('Hello, Home!');
});

// Example Route for redirect
server.setRoute('/index.html', (req, res) => {
    res.redirect('/');
});