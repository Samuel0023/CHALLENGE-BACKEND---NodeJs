const { Movie, Movie_Character, Character } = require("../../../models/index");

const findIdMovie = async(movie = '') => {
    const { id_movie } = await Movie.findOne({ where: { title: movie } });
    if (!id_movie) {
        throw new Error(`No found movie`);
    }
    return id_movie;
}
const findMovieByID = async(id_movie = '') => {
    const movie = await Movie.findOne({ where: { id_movie: id_movie } });

    return {
        'title': movie.getDataValue('title'),
        'genre': movie.getDataValue('genre'),
        'date': movie.getDataValue('date'),
        'cualification': movie.getDataValue('cualification')
    };
}
const findAllMoviesByCharacter = async(id_character = '') => {
    let result = [];
    const movies = await Movie_Character.findAll({ where: { id_character: id_character } });



    for (const indice in movies) {
        let detalle = await findMovieByID(movies[indice].getDataValue('id_movie'));

        result.push(detalle);
    }

    return result;
}
const findAllCharacters = async(result) => {

    const characters = await Character.findAll();

    showCharacters(result, characters);
}

const showCharacters = async(result, characters) => {

    for (const indice in characters) {
        let name = characters[indice].getDataValue('name');
        let image = characters[indice].getDataValue('image');
        result.push({ name, image });
    }
}

const findCharactersByName = async(name = '', result, ) => {

    const characters = await Character.findAll({ where: { name: name } });

    showCharacters(result, characters);
}

const findCharactersByAge = async(age = '', result) => {

    const characters = await Character.findAll({ where: { age: age } });

    showCharacters(result, characters);
}

const findCharactersByMovie = async(id_movie = '', result) => {
    const movie_characters = await Movie_Character.findAll({ where: { id_movie: id_movie } });
    const findCharactersByID = async(id_character = '') => {
        return await Character.findOne({ where: { id_character: id_character } })
    }
    var characters = [];
    for (const indice in movie_characters) {
        let detalle = await findCharactersByID(movie_characters[indice].getDataValue('id_character'));

        characters.push(detalle);
    }

    showCharacters(result, characters);
}

var searcherCharacter = async(code, filter, result) => {

    switch (code) {
        case 0:
            await findCharactersByName(filter, result);
            break;
        case 1:
            await findCharactersByAge(filter, result);
            break;
        default:
            await findCharactersByMovie(filter, result);
            break;
    }

}
module.exports = { findIdMovie, findAllMoviesByCharacter, findAllCharacters, findCharactersByName, findCharactersByMovie, findCharactersByAge, searcherCharacter };