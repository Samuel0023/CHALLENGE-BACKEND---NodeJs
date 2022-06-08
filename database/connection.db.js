const { sequelize } = require('./config.db');

const { User, Movie, Movie_Character, Genre, Character } = require('../models');

const dbConnection = async() => {
    try {
        await sequelize.sync({ force: false });
        console.log(" successfull connection db: ", process.env.DB_NAME);
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos ');
    }
}

module.exports = { dbConnection }