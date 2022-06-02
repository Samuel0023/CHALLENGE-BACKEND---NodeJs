const { Movie } = require("../models/Movie.js");
const { Genre } = require("../../genre/models/Genre");

const { v4: uuidv4 } = require('uuid');

const MoviesController = {
    createMovie: async(req, res) => {
        try {
            const { title, date, cualification, genre } = req.body;
            const { id_genre } = await Genre.findOne({ where: { name: genre } })
            const id_movie = uuidv4();

            const movie = Movie.build({ id_movie, title, date, cualification, id_genre });

            //guardar en la base de datos               
            await movie.save();

            res.json({
                msg: 'Movie build finished',
                movie
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