const { createMovieCharacter } = require("./create.movie_character");
const { deleteMovieCharacter } = require("./delete.movie_character");
const { findAllMoviesByCharacter, findAllCharacters } = require("./search.character");


module.exports = { createMovieCharacter, deleteMovieCharacter, findAllMoviesByCharacter, findAllCharacters }