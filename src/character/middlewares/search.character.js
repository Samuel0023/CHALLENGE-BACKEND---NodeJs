const { Movie, Movie_Character } = require("../../../models/index");
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
        'title': movie.title,
        'genre': movie.genre,
        'date': movie.date,
        'cualification': movie.cualification
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

module.exports = { findIdMovie, findAllMoviesByCharacter };