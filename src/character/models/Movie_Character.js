const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config.db');

const Movie_Character = sequelize.define(
    'Movie_Characters', {
        id_movie_character: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        id_movie: {
            type: DataTypes.UUID,
            references: { model: "Movies", key: "id_movie" }
        },
        id_character: {
            type: DataTypes.UUID,
            references: { model: "Characters", key: "id_character" }
        }
    }, {
        timestamps: false
    }
);


module.exports = { Movie_Character };