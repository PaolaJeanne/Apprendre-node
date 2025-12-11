const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const stuffCtrl = require('../controlleurs/stuff');

// POST - Créer un objet
router.post('/', auth, stuffCtrl.createThing);

// GET - Récupérer tous les objets
router.get('/', auth, stuffCtrl.getAllThings);

// GET - Récupérer un objet par ID
router.get('/:id', auth, stuffCtrl.getThingById);

// PUT - Modifier un objet
router.put('/:id', auth, stuffCtrl.updateThing);

// DELETE - Supprimer un objet
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;