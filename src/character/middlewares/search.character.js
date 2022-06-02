const { Movie, Movie_Character } = require("../../../models/index");
const findIdMovie = async(movie = '') => {
    const { id_movie } = await Movie.findOne({ where: { title: movie } });
    if (!id_movie) {
        throw new Error(`No found movie`);
    }
    return id_movie;
}


module.exports = { findIdMovie }