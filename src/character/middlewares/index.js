const { createMovieCharacter } = require("./create.movie_character");
const { deleteMovieCharacter } = require("./delete.movie_character");
const { findAllMoviesByCharacter } = require("./search.character");


module.exports = { createMovieCharacter, deleteMovieCharacter, findAllMoviesByCharacter }