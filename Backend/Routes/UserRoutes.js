const UserCtrl = require('../Controllers/User.controller');
const express = require('express');
const router = express.Router();

const { _Get, _Post, _GetOne, _Delete, _Put } = require('../Controllers/Messages.controller');

router.get('/api/user', UserCtrl.getUsers);

router.post('/api/user/signup', UserCtrl.postUser); //Registrar usuario

router.post('/api/user/login', UserCtrl.loginUser); //Login usuario

// Rutas del chat
router.get('/api/conversation/', _Get);
router.get('/api/conversation/:Id', _GetOne);
router.post('/api/conversation', _Post);
router.put('/api/conversation/:Id', _Put);
router.delete('/api/conversation/:Id', _Delete);

module.exports = router;
