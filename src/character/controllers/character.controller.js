const { Character } = require("../models/Character.js");

const CharacterController = {
    createCharacter: async(req, res) => {

    },
    getCharacters: async(req, res) => {

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

    },
    deleteCharacter: async(req, res) => {

    }
}

module.exports = CharacterController;