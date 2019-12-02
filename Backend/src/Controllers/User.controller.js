const { User } = require('../Models/User.model');
const { CreateToken } = require('../Services/Auth.service');
const { Config } = require('../Configs/app.config');
const CryptoJS = require('crypto-js');

const UserCtrl = {};

// Obtener todos los usuarios
UserCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

// Registrar usuario
UserCtrl.postUser = async (req, res) => {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, Config.Encrypt);
    await new User(req.body).save().then(user => {
        const User = user.toJSON();
        delete User.password;
        return res.status(user !== null ? 200 : 404).send({
            ...User,
            Token: CreateToken(user.toJSON())
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

module.exports = UserCtrl;
