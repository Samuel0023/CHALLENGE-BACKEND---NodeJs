require('dotenv').config();
const Server = require('./api.services/server');


const server = new Server();

server.listen();