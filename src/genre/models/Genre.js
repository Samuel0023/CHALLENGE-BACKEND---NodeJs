const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config.db');

const Genre = sequelize.define(
    'Genres', {
        id_genre: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        id_movie: {
            type: DataTypes.UUID,
            references: { model: "Movies", key: "id_movie" }
        },
    }, { timestamps: false }
);

module.exports = { Genre };