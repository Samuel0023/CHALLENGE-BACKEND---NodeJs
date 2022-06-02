const { Character } = require("../models/Character.js");
const { Movie_Character } = require("../models/Movie_Character.js");

const isValidateName = async(name = '') => {
    let existNameCharacter = await Character.findOne({ name: name });
    if (!existNameCharacter) {
        throw new Error(`This character_name doesn't exists`);
    }
}
const isValidateNameToSave = async(name = '') => {
    let existNameCharacter = await Character.findOne({ where: { name: name } });
    if (existNameCharacter) {
        throw new Error(`This ${existNameCharacter.name} already exists`);
    }
}
const isValidateMovie = async(id_movie = '') => {
    let existIdMovieCharacter = await Movie_Character.findOne({ id_movie: id_movie });
    if (!existIdMovieCharacter) {
        throw new Error(`This character doesn't exists`);
    }
}
const isValidateCharacter = async(id_character = '') => {
    let existCharacter = await Character.findOne({ id_character });
    if (!existCharacter) {
        throw new Error(`This character doesn't exist`);
    }
}

module.exports = { isValidateName, isValidateMovie, isValidateNameToSave, isValidateCharacter }