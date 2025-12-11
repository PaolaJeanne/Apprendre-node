const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connexion à MongoDB réussie avec Mongoose !');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Connexion à MongoDB échouée !', error.message);
    throw error;
  }
}

module.exports = { connectDB };