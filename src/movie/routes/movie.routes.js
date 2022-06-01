const { Router } = require('express');
const MovieController = require('../controllers/movie.controller');
const { check } = require('express-validator');
const { validateJWT, validateFields } = require('../../../middlewares');
const { isValidateTitle, isValidateGenre } = require('../helpers/validadateMovie')
const router = new Router();

router.get('/', MovieController.getMovies);

router.post('/create', [
    validateJWT,
    check('title').custom(isValidateTitle),
    check('description').not().isEmpty(),
    check('cualification').not().isEmpty(),
    check('genre').custom(isValidateGenre),
    validateFields
], MovieController.createMovie);

module.exports = router;