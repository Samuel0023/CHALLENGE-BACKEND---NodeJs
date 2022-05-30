const { Router } = require('express');
const GenreController = require('../controllers/genre.controllers');
const { validateJWT, validateFields } = require('../../../middlewares');

const router = new Router();

//get all genres
router.get('/', GenreController.getGenres);

router.post('/create', [validateJWT, validateFields], GenreController.createGenre);

module.exports = router;