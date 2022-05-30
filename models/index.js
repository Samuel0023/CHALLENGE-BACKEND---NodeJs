const { DataTypes } = require('sequelize');
const { User } = require('../src/user/models/User');
const { Movie } = require('../src/movie/models/Movie');
const { Movie_Character } = require('../src/movie/models/Movie_Character');
const { Genre } = require('../src/genre/models/Genre');
const { Character } = require('../src/character/models/Character');

Character.belongsToMany(Movie, { through: "Movie_Characters", foreignKey: "id_character" });
Movie.belongsToMany(Character, { through: "Movie_Characters", foreignKey: "id_movie" });

Genre.hasMany(Movie, { foreignKey: "id_movie" });


module.exports = { User, Movie, Movie_Character, Genre, Character };