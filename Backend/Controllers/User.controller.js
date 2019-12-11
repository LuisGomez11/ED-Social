const { User } = require('../Models/User.model');
const { CreateToken } = require('../Services/Auth.service');
const { Storage, Cloudinaryv2, Config } = require('../Configs/app.config');
const path = require('path');
const CryptoJS = require('crypto-js');

const UserCtrl = {};

// Obtener todos los usuarios
UserCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

// Obtener un usuario en especifico
UserCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.password = undefined;
    res.json(user);
}

// Registrar usuario
UserCtrl.postUser = async (req, res) => {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, Config.Encrypt);
    await new User(req.body).save().then(user => {
        const token = CreateToken(user.toJSON());
        res.status(user !== null ? 200 : 404).send({ token });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

// Login usuario
UserCtrl.loginUser = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) return res.status(401).send("Username doen't exists");
    const decryptedPassword = CryptoJS.AES.decrypt(user.toJSON().password, Config.Encrypt).toString(CryptoJS.enc.Utf8);
    // console.log(decryptedPassword);
    if (decryptedPassword !== password) return res.status(401).send("Incorrect password");
    const UserModel = user.toJSON();
    delete UserModel.password;
    const token = CreateToken(UserModel);
    return res.status(200).send({
        User: UserModel,
        Token: token
    });
}

UserCtrl.uploadImage = (req, res) => {
    //validate image with multer
    Storage(req.headers._id)(req, res, err => {
        if (err) return res.status(406).send(err);
        else {
            //upload image in cloudinary
            Cloudinaryv2.uploader.upload(req.file.path, { public_id: path.parse(req.file.filename).name },
                function (err, image) {
                    if (err) return res.status(406).send(err);
                    require('fs').unlinkSync(req.file.path);
                    User.findByIdAndUpdate(req.headers._id, { 'image': image.secure_url }, { new: true }).then(user => {
                        return res.status(user !== null ? 200 : 404).send(user !== null ? user : {});
                    }).catch(err => {
                        return res.status(406).send(err);
                    });
                });
        }
    });
}

UserCtrl.verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }

        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, Config.Token);

        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }

        req.userId = payload._id;
        next();
    } catch (e) {
        return res.status(401).send('Unauhtorized Request');
    }
}


module.exports = UserCtrl;
