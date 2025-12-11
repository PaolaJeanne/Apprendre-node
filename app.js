const express = require('express');
const stuffRoutes = require('./routes/stuff');
const usersRoutes = require('./routes/User');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', usersRoutes);

module.exports = app;