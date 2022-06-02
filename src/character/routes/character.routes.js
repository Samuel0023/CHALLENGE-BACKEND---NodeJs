const { Router } = require('express');
const { check } = require('express-validator');
const CharacterController = require('../controllers/character.controller');
const { validateJWT, validateFields } = require('../../../middlewares');
const { isValidateName, isValidateMovie, isValidateNameToSave, isValidateCharacter } = require('../helpers/validateCharacter');

const router = new Router();

//get all characters
router.get('/', CharacterController.getCharacters);

router.get('/movie_characters', CharacterController.getAllMoviesCharacters);
//get an especific  - character name
router.get('/:name', [
    check('name', 'invalid name').not().isEmpty(),
    check('name').custom(isValidateName),
    validateFields
], CharacterController.getCharacterByName);
//get all  characters  - by age
router.get('/:age', [
    check('age', 'invalid age').not().isEmpty(),
    validateFields
], CharacterController.getCharactersByAge);
//get all characters - by movies
router.get('/:movies', [
    check('id_movie').custom(isValidateMovie),
    validateFields
], CharacterController.getCharacterByMovie);

//create a new category - private - (token valid) "post"
router.post('/create', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('name').custom(isValidateNameToSave),
    check('age', 'age is required').not().isEmpty(),
    check('description').not().isEmpty(),
    validateFields
], CharacterController.createCharacter);
//Actualizar - private - (token valid) "put"

router.put('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(isValidateCharacter),
    validateFields
], CharacterController.updateCharacter);

//Delete category - private - Admin

router.delete('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(isValidateCharacter),
    validateFields
], CharacterController.deleteCharacter);
module.exports = router;