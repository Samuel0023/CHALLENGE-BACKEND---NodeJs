const express = require('express');
require('dotenv');

const cors = require('cors');
const { createServer } = require('http');
const { dbConnection } = require('../database/connection.db');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);

        this.paths = {
            auth: '/auth',
            genre: '/genre'
        };
        //connection db
        this.connectDB();
        //middlewares
        this.middlewares();
        this.app.use(express.json());
        //routes
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.paths.auth, require('./user/routes/user.auth.routes'));
        this.app.use(this.paths.genre, require('./genre/routes/genre.routes'));

    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;