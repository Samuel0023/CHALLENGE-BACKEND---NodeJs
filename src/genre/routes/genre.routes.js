const { Router } = require('express');
const GenreController = require('../controllers/genre.controllers');
const { check } = require('express-validator');
const { validateJWT, validateFields } = require('../../../middlewares');
const { isValidateName } = require('../helpers/validateGenre.js')
const router = new Router();

//get all genres
router.get('/', GenreController.getGenres);

router.post('/create', [validateJWT, check('name').custom(isValidateName), validateFields], GenreController.createGenre);

module.exports = router;