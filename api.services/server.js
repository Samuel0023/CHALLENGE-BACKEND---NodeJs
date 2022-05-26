const express = require('express');
require('dotenv');
const { createServer } = require('http');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);

        this.paths = {}

        //middlewares
        this.middlewares();
        this.app.use(express.json());
        //routes
        this.routes();
    }

    middlewares() {

    }

    routes() {

    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;