const PublicationCtrl = require('../Controllers/Publication.controller');
const express = require('express');
const router = express.Router();

router.get('/api/publication', PublicationCtrl.getPublications);

router.post('/api/publication', PublicationCtrl.postPublication);

// router.post('/user/login', UserCtrl.loginUser);

module.exports = router;
