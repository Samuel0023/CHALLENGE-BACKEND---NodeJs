const { Genre } = require("../models/Genre.js");

const isValidateName = async(name = '') => {
    let existNameGenre = await Genre.findOne({
        where: { name: name }
    });
    if (existNameGenre) {
        throw new Error(`This genre already exists`);
    }
}


module.exports = { isValidateName }