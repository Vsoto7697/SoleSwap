const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');
const User = require('../models/user'); // Replace with the actual user model import

// Middleware function to authenticate user
const authenticateUser = (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      throw new Unauthorized('Missing authorization token');
    }
  
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
    // Attach the authenticated user to the request object
    req.user = decodedToken;
  
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateUser
};
