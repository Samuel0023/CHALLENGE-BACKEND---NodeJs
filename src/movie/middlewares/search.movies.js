const { Movie, Movie_Character, Character } = require("../../../models/index");

const findCharacterById = async(id_character = '') => {
    const movies = await Character.findOne({ where: { id_character: id_character } });

    return {
        'name': movies.getDataValue('name'),
        'image': movies.getDataValue('image')
    };
}
const findAllCharactersByMovie = async(id_movie = '') => {
    let result = [];
    const movies = await Movie_Character.findAll({ where: { id_movie: id_movie } });



    for (const indice in movies) {
        let detalle = await findCharacterById(movies[indice].getDataValue('id_character'));

        result.push(detalle);
    }

    return result;
}


const showCharacters = async(result, movies) => {

    for (const indice in movies) {
        let title = movies[indice].getDataValue('title');
        let image = movies[indice].getDataValue('image');
        result.push({ title, image });
    }
}

const findAllMoviesByName = async(name = '', result, ) => {

    const movies = await Movie.findAll({ where: { title: name } });

    showCharacters(result, movies);
}

const findMoviesByGenre = async(id_genre = '', result) => {

    const movies = await Movie.findAll({ where: { id_genre: id_genre } });

    showCharacters(result, movies);
}

const findMoviesWithOrder = async(order = '', result) => {
    const movies = await Movie.findAll({
        order: [
            ['date', order]
        ]
    });
    showCharacters(result, movies);
}

var searcherMovie = async(code, filter, result) => {

    switch (code) {
        case 0:
            await findAllMoviesByName(filter, result);
            break;
        case 1:
            await findMoviesByGenre(filter, result);
            break;
        default:
            await findMoviesWithOrder(filter, result);
            break;
    }

}
const findAllMovies = async(result) => {

    const characters = await Movie.findAll();

    showCharacters(result, characters);
}



module.exports = { findAllCharactersByMovie, searcherMovie, findAllMovies };