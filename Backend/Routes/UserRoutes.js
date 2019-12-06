const UserCtrl = require('../Controllers/User.controller');
const express = require('express');
const router = express.Router();

const { _Get, _Post, _GetOne, _Delete, _Put } = require('../Controllers/Messages.controller');

router.get('/user', UserCtrl.getUsers);

router.post('/user/signup', UserCtrl.postUser); //Registrar usuario

router.post('/user/login', UserCtrl.loginUser); //Login usuario

// Rutas del chat
router.get('/conversation/', _Get);
router.get('/conversation/:Id', _GetOne);
router.post('/conversation', _Post);
router.put('/conversation/:Id', _Put);
router.delete('/conversation/:Id', _Delete);

module.exports = router;
