const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route: POST /api/auth/register
router.post('/register', authController.register);

// Route: POST /api/auth/login
router.post('/login', authController.login);

// Route: POST /api/auth/logout
router.post('/logout', authController.logout);

// Route: POST /api/auth/reset-password
router.post('/reset-password', authController.resetPassword);

// Route: POST /api/auth/verify-email
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
