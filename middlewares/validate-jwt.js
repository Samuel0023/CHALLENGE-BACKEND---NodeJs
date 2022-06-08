const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateJWT = async(req, res, next) => {
    let token = req.header('x-token');

    if (!token) {
        return res.status(404).json({
            msg: "no token was send"
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        let user = await User.findOne({ where: { id_user: uid } });
        //verificar si fue borrado de la DB
        if (!user) {
            return res.status(401).json({
                msg: 'no found user in DB'
            });
        }

        req.uid = uid;
        req.userAuth = user;

        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: "invalid token"
        });
    }
};
module.exports = { validateJWT };