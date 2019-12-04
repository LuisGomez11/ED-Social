const UserCtrl = require('../Controllers/User.controller');
const express = require('express');
const router = express.Router();

router.get('/user', UserCtrl.verifyToken, UserCtrl.getUsers);

router.post('/user/signup', UserCtrl.postUser); //Registrar usuario

router.post('/user/login', UserCtrl.loginUser); //Login usuario

module.exports = router;
