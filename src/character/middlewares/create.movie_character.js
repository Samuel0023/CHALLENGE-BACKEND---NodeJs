const { Movie_Character } = require("../models/Movie_Character");
const { findIdMovie } = require("./search.character");

const createMovieCharacter = async(nameMovie, id_character, id_movie_character) => {
    const id_movie = await findIdMovie(nameMovie);

    const moviecharacter = await Movie_Character.build({ id_movie_character, id_character, id_movie });
    await moviecharacter.save();
}


module.exports = { createMovieCharacter }