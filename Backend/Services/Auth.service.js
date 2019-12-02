const JWT = require('jsonwebtoken');
const Moment = require('moment');
const { Config } = require('../Configs/app.config');

//Function to create token
exports.CreateToken = User => {
    //token payload
    const payload = {
        sub: User._id,
        iat: Moment().unix(),
        exp: Moment().add(15, 'days').unix()
    }

    //return token
    return JWT.sign(payload, Config.Token);
};

//token decoding function
exports.Decode = token => {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = JWT.decode(token, Config.Token)
            //valid if it has not expired
            if (payload.exp <= Moment().unix()) {
                reject({
                    status: 401,
                    message: 'Session expired re-enter'
                });
            }
            resolve(payload.sub)
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    });
    return decoded
};