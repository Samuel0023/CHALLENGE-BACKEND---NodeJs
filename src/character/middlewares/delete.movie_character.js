const { Movie_Character } = require("../models/Movie_Character.js");

const deleteMovieCharacter = async(id_character) => {
    const moviecharacter = await Movie_Character.findOne({ id_character });
    await moviecharacter.destroy();
}


module.exports = { deleteMovieCharacter }