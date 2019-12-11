/**
 * Validation token
 */
const Auth = require('../Services/Auth.service');

exports.isAuth = (req, res, next) => {
    //validate header
    if (!req.headers.authorization) {
        return res.status(403).send();
    }

    //get token
    const token = req.headers.authorization.split(' ')[1];

    //decode token
    Auth.Decode(token)
        .then(response => {
            req.headers._id = response;
            next();
        })
        .catch(response => {
            return res.status(response.status).send({ Message: response.message });
        });
}