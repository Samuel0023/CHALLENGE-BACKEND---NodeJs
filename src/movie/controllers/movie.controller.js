const { Movie } = require("../models/Movie.js");
const { Movie_Character } = require("../models/Movie_Character.js");
const { Genre } = require("../../genre/models/Genre");

const { v4: uuidv4 } = require('uuid');

const MoviesController = {
    createMovie: async(req, res) => {
        try {
            const { title, date, cualification, genre } = req.body;
            const { id_genre } = await Genre.findOne({ where: { name: genre } })
            const id_movie = uuidv4();
            const id_movie_character = uuidv4();

            const movie = Movie.build({ id_movie, title, date, cualification, id_genre });

            const movie_character = Movie_Character.build({ id_movie_character, id_movie });
            //guardar en la base de datos               
            await movie.save();
            await movie_character.save();

            res.json({
                msg: 'Movie build finished',
                movie,
                movie_character
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    getMovies: async(req, res) => {
        try {
            const movies = await Movie.findAll();

            res.json({
                movies
            })
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = MoviesController;