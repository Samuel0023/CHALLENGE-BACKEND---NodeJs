const { Router } = require('express');
const { check } = require('express-validator');
const CharacterController = require('../controllers/character.controller');
const { validateJWT, validateFields } = require('../../../middlewares');
const { isValidateName, isValidateMovie, isValidateNameToSave, isValidateCharacter } = require('../helpers/validateCharacter');

const router = new Router();

//get all characters
router.get('/', [validateJWT, validateFields], CharacterController.getCharacters);

router.get('/movie_characters', CharacterController.getAllMoviesCharacters);
router.get('/:id', [validateJWT, validateFields], CharacterController.getCharacter);

//get an especific  - character name


//create a new character - private - (token valid) "post"
router.post('/create', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('name').custom(isValidateNameToSave),
    check('age', 'age is required').not().isEmpty(),
    check('description').not().isEmpty(),
    validateFields
], CharacterController.createCharacter);

//Add one character to a movie and
router.post('/movie_character/:id', [check('id').custom(isValidateCharacter), check('nameMovie').custom(isValidateName), validateFields], CharacterController.setCharacterForMovie)
    //Actualizar - private - (token valid) "put"

router.put('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(isValidateCharacter),
    validateFields
], CharacterController.updateCharacter);


router.put('/uploadImage/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(isValidateCharacter),
    validateFields
], CharacterController.updateCharacterImage);
//Delete category - private - Admin

router.delete('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(isValidateCharacter),
    validateFields
], CharacterController.deleteCharacter);
module.exports = router;