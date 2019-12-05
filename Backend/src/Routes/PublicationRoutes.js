const PublicationCtrl = require('../Controllers/Publication.controller');
const express = require('express');
const router = express.Router();

router.get('/publication', PublicationCtrl.getPublications);

router.post('/publication', PublicationCtrl.postPublication);

// router.post('/user/login', UserCtrl.loginUser);

module.exports = router;