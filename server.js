// server.js
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const sequelize = require('./dbconfig');
const User = require('./models/User');
const passportConfig = require('./passportConfig');  // Passport configuration
const authRoutes = require('./routes/auth');
const relationshipRoutes = require('./routes/relationships');


const app = express();
app.use(cors());
app.use(express.json());


// Initialize Passport.js
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);  // Register and login
app.use('/api', relationshipRoutes);  // CRUD operations on relationships

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
