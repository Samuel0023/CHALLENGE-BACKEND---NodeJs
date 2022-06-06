const { Movie } = require("../models/Movie.js");
const { Genre } = require("../../genre/models/Genre")

const isValidateTitle = async(title = '') => {
    let existTitleMatch = await Movie.findOne({ where: { title: title } });
    if (existTitleMatch) {
        throw new Error(`This movie already exists`);
    }
}


const isValidateGenre = async(genre = '') => {
    let existNameGenre = await Genre.findOne({ where: { name: genre } });
    if (!existNameGenre) {
        throw new Error(`This genre does not exist`);
    }
}
const idValidateMovie = async(id_movie = '') => {
    let existsMovie = await Character.findOne({ where: { id_movie: id_movie } });
    if (!existsMovie) {
        throw new Error(`This Movie doesn't exist`);
    }
}


module.exports = { isValidateTitle, isValidateGenre, idValidateMovie }