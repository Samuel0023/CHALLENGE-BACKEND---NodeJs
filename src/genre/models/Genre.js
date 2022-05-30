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
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING
        }
    }, { timestamps: false }
);

module.exports = { Genre };