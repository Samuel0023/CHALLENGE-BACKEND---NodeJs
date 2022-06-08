const { Router } = require('express');
const GenreController = require('../controllers/genre.controllers');
const { check } = require('express-validator');
const { validateJWT, validateFields } = require('../../../middlewares');
const { isValidateName, idValidateGenre } = require('../helpers/validateGenre.js')
const router = new Router();

//get all genres
router.get('/', [validateJWT, validateFields], GenreController.getGenres);

router.post('/create', [validateJWT, check('name').custom(isValidateName), validateFields], GenreController.createGenre);


router.put('/uploadImage/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id').custom(idValidateGenre),
    validateFields
], GenreController.updateGenreImage);
module.exports = router;