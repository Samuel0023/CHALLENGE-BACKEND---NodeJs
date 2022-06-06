const { createMovieCharacter } = require("./create.movie_character");
const { deleteMovieCharacter } = require("./delete.movie_character");
const { findAllMoviesByCharacter, findAllCharacters, findCharactersByName, findCharactersByAge, findCharactersByMovie, findCharacter } = require("./search.character");


module.exports = { createMovieCharacter, deleteMovieCharacter, findAllMoviesByCharacter, findAllCharacters, findCharacter, findCharactersByName, findCharactersByAge, findCharactersByMovie }