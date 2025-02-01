const { expressjwt: jwt } = require('express-jwt');
require("dotenv").config();

const authMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
}).unless({
  path: ['/login', '/register'], // Exclude these routes
});

const attachUserData = (req, res, next) => {
  if (req.auth) { // Ensure the JWT middleware attaches `auth`
    req.user = req.auth; // Attach decoded token to req.user
  }
  next();
};

module.exports = { authMiddleware, attachUserData };
