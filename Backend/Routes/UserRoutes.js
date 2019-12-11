const UserCtrl = require('../Controllers/User.controller');
const express = require('express');
const router = express.Router();
const { isAuth } = require('../Middlewares/Auth.middlewares');

const { _Get, _Post, _GetOne, _Delete, _Put } = require('../Controllers/Messages.controller');

router.get('/api/user', UserCtrl.getUsers);
router.get('/api/user/:id', UserCtrl.getUser);
router.post('/api/user/signup', UserCtrl.postUser); //Registrar usuario
router.post('/api/user/login', UserCtrl.loginUser); //Login usuario
router.put('/api/user/upload', isAuth,  UserCtrl.uploadImage);

// Rutas del chat
router.get('/api/conversation/', _Get);
router.get('/api/conversation/:Id', _GetOne);
router.post('/api/conversation', _Post);
router.put('/api/conversation/:Id', _Put);
router.delete('/api/conversation/:Id', _Delete);

module.exports = router;
