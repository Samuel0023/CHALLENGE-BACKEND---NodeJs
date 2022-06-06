const { Movie } = require("../models/Movie.js");
const { Genre } = require("../../genre/models/Genre");
const { findAllCharactersByMovie, searcherMovie } = require("../helpers/search.movies")
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
    getMovie: async(req, res) => {

        const { id } = req.params;
        try {
            const { title, date, cualification, image } = await Movie.findOne({ where: { id_movie: id } });
            const movies = await findAllCharactersByMovie(id);

            res.json({
                title,
                date,
                cualification,
                image,
                movies
            })
        } catch (error) {
            console.log(error);

        }
    },
    getMovies: async(req, res) => {
        const filters = req.query;
        try {
            let movies = [];
            let keys = ['name', 'genre', 'order'];

            if (keys.some(op => op == Object.keys(filters))) {
                let indice = 0;
                for (let i = 0; i < keys.length; i++) {

                    if (keys[i] == Object.keys(filters)) {
                        indice = i;


                        await searcherMovie(indice, filters[keys[indice]], movies);
                    }
                }
                if (movies.length == 0) {
                    return res.status(404).json({
                        message: `No movie found by ${keys[indice]} = ${filters[keys[indice]]}`
                    });
                }
            } else {

                await findAllCharacters(movies);

                if (movies.length == 0) {
                    return res.status(404).json({
                        message: `No movie found`
                    });
                }
            }

            return res.status(200).json({
                movies
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "We can't do This Search" });

        }
    },
    updateMovie: async(req, res) => {

        const { id } = req.params;
        try {
            const { title, date, cualification, id_genre } = req.body;

            const movie = await Movie.findOne({ where: { id_movie: id } });

            movie.set({
                title,
                date,
                cualification,
                id_genre

            });

            await movie.save();
            res.json({
                msg: "Update succesfull",
                movie
            });
        } catch (error) {

            console.log(error);
            throw new Error(error);
        }

    },
    deleteMovie: async(req, res) => {
        const { id } = req.params;
        try {
            const movie = await Movie.findOne({ where: { id_movie: id } });
            await deleteMovieCharacter(movie.id_movie);
            await movie.destroy();

            res.status(200).json({ msg: "movie ${name} deleted" });
        } catch (error) {

            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = MoviesController;