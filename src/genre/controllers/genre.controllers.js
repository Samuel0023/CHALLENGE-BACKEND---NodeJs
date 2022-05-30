const { Genre } = require("../models/Genre.js");

const { v4: uuidv4 } = require('uuid');

const GenreController = {
    createGenre: async(req, res) => {
        try {
            const { name } = req.body;
            const id_genre = uuidv4();
            const genre = Genre.build({ id_genre, name });

            //guardar en la base de datos
            await genre.save();


            res.json({
                msg: 'POST API - Controller',
                genre
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    getGenres: async(req, res) => {
        try {
            const genres = await Genre.findAll();

            res.json({
                genres
            })
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = GenreController;