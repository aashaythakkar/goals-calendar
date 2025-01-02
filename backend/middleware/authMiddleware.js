const jwt = require('express-jwt');
const { User } = require('../models');

// Middleware to protect routes
const authMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

module.exports = authMiddleware;
