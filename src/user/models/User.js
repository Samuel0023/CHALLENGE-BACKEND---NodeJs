const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config.db');

const User = sequelize.define(
    "Users", {

        id_user: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false
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