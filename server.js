// Configuration d'environnement EN PREMIER
require('dotenv').config();

const { connectDB } = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Connexion à MongoDB puis démarrage du serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur le port ${PORT}`);
  });
}).catch(err => {
  console.error('❌ Impossible de démarrer le serveur:', err);
  process.exit(1);
});