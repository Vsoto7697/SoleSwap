const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Retrieve user profile information
router.get('/', authMiddleware.authenticate, profileController.getProfile);

// Update user profile information
router.put('/', authMiddleware.authenticate, profileController.updateProfile);

// Update user password
router.put('/password', authMiddleware.authenticate, profileController.updatePassword);

// Delete user account
router.delete('/', authMiddleware.authenticate, profileController.deleteAccount);

module.exports = router;
