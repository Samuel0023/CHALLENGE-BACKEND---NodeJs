const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config.db');

const User = sequelize.define(
    "Users", {

        id_user: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false
    }
);

module.exports = { User };