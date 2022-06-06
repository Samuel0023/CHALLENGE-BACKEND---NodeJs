const { Character } = require("../models/Character.js");
const { Movie_Character } = require("../models/Movie_Character");

const { createMovieCharacter, deleteMovieCharacter, searcherCharacter, findAllMoviesByCharacter, findAllCharacters, findCharactersByName, findCharactersByAge, findCharactersByMovie } = require("../middlewares");
const { v4: uuidv4 } = require('uuid');

const CharacterController = {
    createCharacter: async(req, res) => {
        try {
            const { name, age, weight, description, nameMovie } = await req.body;
            const id_character = uuidv4();
            const id_movie_character = uuidv4();

            const character = await Character.build({ id_character, name, age, weight, description, id_movie_character });
            //guardar en la base de datos               
            await character.save();
            await createMovieCharacter(nameMovie, character.id_character, id_movie_character);


            res.json({
                msg: 'Character build finished',
                character
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "We can't save this Character" });

        }
    },
    getAllMoviesCharacters: async(req, res) => {
        try {
            const moviecharacter = await Movie_Character.findAll();
            res.json({ moviecharacter });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    getCharacter: async(req, res) => {

        const { id } = req.params;
        try {
            const { name, age, weight, description, image } = await Character.findOne({ where: { id_character: id } });
            const movies = await findAllMoviesByCharacter(id);

            res.json({
                name,
                age,
                weight,
                description,
                image,
                movies
            })
        } catch (error) {
            console.log(error);

        }
    },
    getCharacters: async(req, res) => {
        const filters = req.query;
        try {
            let characters = [];
            let keys = ['name', 'age', 'movies']
                // here i check if the filters i recv in query params is defined in the possible keys to search an a character
            if (keys.some(op => op == Object.keys(filters))) {
                let indice = 0;
                for (let i = 0; i < keys.length; i++) {

                    if (keys[i] == Object.keys(filters)) {
                        indice = i;


                        await searcherCharacter(indice, filters[keys[indice]], characters);
                    }
                }
                if (characters.length == 0) {
                    return res.status(404).json({
                        message: `No character found by ${keys[indice]} = ${filters[keys[indice]]}`
                    });
                }
            } else {

                await findAllCharacters(characters);

                if (characters.length == 0) {
                    return res.status(404).json({
                        message: `No character found`
                    });
                }
            }

            return res.status(200).json({
                characters
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "We can't find this character" });

        }
    },
    setCharacterForMovie: async(req, res) => {
        const { id } = req.params;
        try {
            const { nameMovie } = req.body;

            const { id_character } = await Character.findOne({ where: { id_character: id } });

            await createMovieCharacter(nameMovie, id, id_character);


            res.json({
                msg: "Update moviexcharacter succesfull",
            });
        } catch (error) {

            console.log(error);
            throw new Error(error);
        }
    },
    updateCharacter: async(req, res) => {

        const { id } = req.params;
        try {
            const { name, age, weight, description } = req.body;

            const character = await Character.findOne({ where: { id_character: id } });

            character.set({
                name,
                age,
                weight,
                description
            });

            await character.save();
            res.json({
                msg: "Update succesfull",
                character
            });
        } catch (error) {

            console.log(error);
            throw new Error(error);
        }

    },
    deleteCharacter: async(req, res) => {
        const { id } = req.params;
        try {
            const character = await Character.findOne({ where: { id_character: id } });
            await deleteMovieCharacter(character.id_character);
            await character.destroy();

            res.status(200).json({ msg: "character ${name} deleted" });
        } catch (error) {

            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = CharacterController;