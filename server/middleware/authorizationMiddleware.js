const jwt = require('jsonwebtoken');

// Middleware to protect routes that require authentication
exports.authenticate = (req, res, next) => {
  // Check if the request contains a valid JWT token
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  try {
    // Verify the token and extract the user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to restrict access based on user roles
exports.authorize = (roles) => (req, res, next) => {
  // Check if the authenticated user has the required role
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access forbidden' });
  }
  next();
};

const express = require('express');
const router = express.Router();
const authMiddleware = require('./authorizationMiddleware');
const profileController = require('../controllers/profileController');

// Route: GET /api/profile
router.get('/', authMiddleware.authenticate, profileController.getProfile);

// Route: PUT /api/profile
router.put('/', authMiddleware.authenticate, profileController.updateProfile);

// Route: PUT /api/profile/password
router.put('/password', authMiddleware.authenticate, profileController.updatePassword);

// Route: DELETE /api/profile
router.delete('/', authMiddleware.authenticate, profileController.deleteAccount);

module.exports = router;


