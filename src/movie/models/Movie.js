const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config.db');

const Movie = sequelize.define(
    'Movies', {
        id_movie: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        cualification: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false }
);


module.exports = { Movie }