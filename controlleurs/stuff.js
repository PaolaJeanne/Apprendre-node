const Thing = require('../models/Thing');

exports.getAllThings = async (req, res, next) => {
  try {
    const things = await Thing.find();  // ← Variable "things" (pluriel)
    res.status(200).json(things);  // ← Renvoie directement le tableau
  } catch (error) {
    console.error('Erreur getAllThings:', error);
    res.status(400).json({ 
      error: error.message || 'Erreur lors de la récupération des données' 
    });
  }
}

exports.getThingById = async (req, res, next) => {
  try {
    const thing = await Thing.findById(req.params.id);
    if (!thing) {
      return res.status(404).json({ message: 'Objet non trouvé !' });
    }
    res.status(200).json({ thing: thing });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.createThing = async (req, res, next) => {
  try {
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.auth.userId  // ← Utilise automatiquement l'ID du token
    });
    await thing.save();
    res.status(201).json({
      message: 'Objet créé et enregistré dans MongoDB !',
      thing: thing
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.updateThing = async (req, res, next) => {
  try {
    // D'abord récupérer l'objet pour vérifier le propriétaire
    const thing = await Thing.findById(req.params.id);
    
    if (!thing) {
      return res.status(404).json({ message: 'Objet non trouvé !' });
    }
    
    // Vérifier que l'utilisateur connecté est bien le propriétaire
    if (thing.userId !== req.auth.userId) {
      return res.status(403).json({ error: 'Requête non autorisée !' });
    }
    
    // Mettre à jour l'objet
    await Thing.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.auth.userId  // ← Utilise l'ID du token
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({ message: 'Modified!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.deleteThing = async (req, res, next) => {
  try {
    // D'abord récupérer l'objet pour vérifier le propriétaire
    const thing = await Thing.findById(req.params.id);
    
    if (!thing) {
      return res.status(404).json({ message: 'Objet non trouvé !' });
    }
    
    // Vérifier que l'utilisateur connecté est bien le propriétaire
    if (thing.userId !== req.auth.userId) {
      return res.status(403).json({ error: 'Requête non autorisée !' });
    }
    
    // Supprimer l'objet
    await Thing.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Deleted!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}