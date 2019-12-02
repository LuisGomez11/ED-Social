const UserCtrl = require('../Controllers/User.controller');
const express = require('express');
const router = express.Router();

router.get('/user', UserCtrl.getUsers);

router.post('/user', UserCtrl.postUser);

module.exports = router;
