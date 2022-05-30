const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config.db');
const Character = sequelize.define(
    'Characters', {
        id_character: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    }
);

module.exports = { Character };