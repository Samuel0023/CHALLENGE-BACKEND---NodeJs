const { generateJWT } = require('../helpers/auth.token');
const Login = require("../helpers/loginUser");

const { User } = require('../models/User');

const login = async(req, res) => {

    const { mail, password } = req.body;

    try {
        const user = await User.findOne({ where: { mail } });
        const login = new Login(mail, password);
        login.setUser(user);
        //verificar si el correo existe

        return login.validateUser(res);
        //Generar el JWT -json web token

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Fatal error, talk to admin'
        });
    }

};

const renewToken = async(req, res) => {
    const user = req.userAuth;

    //generar JWT
    const token = await generateJWT(user.id);
    res.json({
        user,
        token
    })
}
module.exports = { login, renewToken };