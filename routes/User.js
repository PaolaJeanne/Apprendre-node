const express = require('express');
const router = express.Router();
const usersCtrl = require('../controlleurs/User');

// Route pour l'inscription
router.post('/signup', usersCtrl.signup);
// Route pour la connexion
router.post('/login', usersCtrl.login);


module.exports = router;