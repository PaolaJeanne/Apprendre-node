const mongoose = require('mongoose');
// Supprimez la ligne d'import du module non installé :
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Supprimez cette ligne qui utilise le plugin :
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);