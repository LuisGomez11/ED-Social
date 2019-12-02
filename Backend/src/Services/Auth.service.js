const JWT = require('jsonwebtoken');
const Moment = require('moment');
const { Config } = require('../Configs/app.config');

exports.CreateToken = User => {

    const payload = {
        user: User._id,
        iat: Moment().unix(),
        exp: Moment().add(15, 'days').unix()
    }

    //return token
    return JWT.sign(payload, Config.Token);
};
