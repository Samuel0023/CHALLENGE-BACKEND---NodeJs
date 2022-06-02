const { Character } = require("../models/Character.js");
const { Movie_Character } = require("../models/Movie_Character");

const { createMovieCharacter, deleteMovieCharacter } = require("../middlewares");
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
            throw new Error(error);
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
    getCharacters: async(req, res) => {
        try {
            const characters = await Character.findAll();

            res.json({
                characters
            })
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    getCharacterByName: async(req, res) => {
        const { name } = req.params;
        try {
            const character = await Character.findOne({ name });
            res.json({
                character
            });
        } catch (error) {
            res.status(400).json({
                msg: "character_name not found"
            });
        }
    },
    getCharactersByAge: async(req, res) => {
        const { age } = req.params;
        try {
            const character = await Character.findAll({ age });
            res.json({
                character
            });
        } catch (error) {
            res.status(400).json({
                msg: "character_age not found"
            });
        }
    },
    getCharacterByMovie: async(req, res) => {
        const { movie } = req.params;
        try {
            const character = await Character.findOne({ movie });
            res.json({
                character
            });
        } catch (error) {
            res.status(400).json({
                msg: "character_id_movie not found"
            });
        }
    },
    updateCharacter: async(req, res) => {

        const { id } = req.params;
        try {
            const { name, age, weight, description, ...rest } = req.body;
            console.log(id);
            const character = await Character.findOne({ where: { id_character: id } });
            character.name = name;
            character.age = age;
            character.weight = weight;
            character.description = description;

            await character.update();

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