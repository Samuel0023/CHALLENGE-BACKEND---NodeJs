const { Router } = require('express');
const MovieController = require('../controllers/movie.controller');
const { check } = require('express-validator');
const { validateJWT, validateFields } = require('../../../middlewares');
const { isValidateTitle, isValidateGenre, idValidateMovie } = require('../helpers/validadateMovie')
const router = new Router();

router.get('/', [validateJWT, validateFields], MovieController.getMovies);
router.get('/:id', MovieController.getMovie);
router.post('/create', [
    validateJWT,
    check('title').custom(isValidateTitle),
    check('description').not().isEmpty(),
    check('cualification').not().isEmpty(),
    check('genre').custom(isValidateGenre),
    validateFields
], MovieController.createMovie);


router.put('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(idValidateMovie),
    validateFields
], MovieController.updateMovie);

//Delete category - private - Admin

router.delete('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(idValidateMovie),
    validateFields
], MovieController.deleteMovie);
module.exports = router;