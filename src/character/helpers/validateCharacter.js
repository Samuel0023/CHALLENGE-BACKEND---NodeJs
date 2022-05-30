const { Character } = require("../models/Character.js");
const { Movie_Character } = require("../../movie/models/Movie_Character.js");

const isValidateName = async(name = '') => {
    let existNameCharacter = await Character.findOne({ name });
    if (!existNameCharacter) {
        throw new Error(`This character_name doesn't exists`);
    }
}
const isValidateMovie = async(id_movie = '') => {
    let existIdMovieCharacter = await Movie_Character.findOne({ id_movie });
    if (!existIdMovieCharacter) {
        throw new Error(`This characterdoesn't exists`);
    }
}

module.exports = { isValidateName, isValidateMovie }