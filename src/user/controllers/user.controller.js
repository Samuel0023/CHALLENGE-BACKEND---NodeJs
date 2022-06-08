'use strict'
const bcrytjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/User');

const { sendMail } = require('../../../microservices/mail/send.mail');


const UserController = {

    usersPost: async(req, res) => {

        try {
            const { name, mail, password, age } = req.body;
            const id_user = uuidv4();
            const user = User.build({ id_user, name, mail, password, age });


            //Encriptar la contraseña
            var salt = bcrytjs.genSaltSync();
            user.password = bcrytjs.hashSync(password, salt);
            //guardar en la base de datos
            await user.save();
            await sendMail(user.getDataValue('mail'), user.getDataValue('name'));


            res.json({
                msg: 'POST API - Controller',
                user
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    usersGets: async(req, res) => {
        try {
            const users = await User.findAll();

            res.json({
                users
            })
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}



module.exports = UserController;