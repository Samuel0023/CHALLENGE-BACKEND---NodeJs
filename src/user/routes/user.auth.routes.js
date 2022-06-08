const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/user.auth.controller');
const { validateFields } = require('../../../middlewares');
const { isValiteMail } = require('../helpers/register.login.validators');
const UserController = require('../controllers/user.controller');

const router = new Router();

router.post('/register', [
    check('name', 'invalid name').not().isEmpty(),
    check('password', 'invalid password at least 6 caracters').isLength({ min: 6 }),
    check('mail', 'invalid mail').isEmail(),
    //check('mail').custom(isValiteMail),
    validateFields
], UserController.usersPost);

router.get('/users', UserController.usersGets);
router.post('/login', [
    check('mail', 'mail is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;