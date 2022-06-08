const { Genre } = require("../models/Genre.js");

const isValidateName = async(name = '') => {
    let existNameGenre = await Genre.findOne({
        where: { name: name }
    });
    if (existNameGenre) {
        throw new Error(`This genre already exists`);
    }
}
const idValidateGenre = async(id_genre = '') => {
    let existsMovie = await Genre.findOne({ where: { id_genre: id_genre } });
    if (!existsMovie) {
        throw new Error(`This Genre doesn't exist`);
    }
}


module.exports = { isValidateName, idValidateGenre }