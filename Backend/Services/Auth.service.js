const JWT = require('jsonwebtoken');
const Moment = require('moment');
const { Config } = require('../Configs/app.config');

exports.CreateToken = User => {

    const payload = {
        sub: User._id, // Id del usuario
        iat: Moment().unix(), // Cuando se crea el token
        exp: Moment().add(10, 'days').unix() // Cuando expira el token
    }

    //retornar el token
    return JWT.sign(payload, Config.Token);
};
