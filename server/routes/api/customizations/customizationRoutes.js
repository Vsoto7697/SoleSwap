const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

// Require the customizationController module
const customizationController = require('../../../controllers/customizationController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Route: POST /api/customization
router.post(
  '/',
  [
    // Input validation using express-validator
    body('userId').notEmpty().withMessage('User ID is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  authMiddleware.authenticateUser,
  customizationController.createCustomizationRequest
);

// Route: GET /api/customization
router.get('/', customizationController.getAllCustomizationRequests);

// Route: GET /api/customization/:id
router.get(
  '/:id',
  [
    // Input validation using express-validator
    param('id').isMongoId().withMessage('Invalid ID'),
  ],
  customizationController.getCustomizationRequestById
);

// Route: POST /api/customization/:id/offers
router.post(
  '/:id/offers',
  [
    // Input validation using express-validator
    param('id').isMongoId().withMessage('Invalid ID'),
    body('offerAmount').isNumeric().withMessage('Offer amount must be a number'),
  ],
  authMiddleware.authenticateUser,
  customizationController.addOfferToCustomizationRequest
);

// Route: POST /api/customization/:id/accept-offer
router.post(
  '/:id/accept-offer',
  [
    // Input validation using express-validator
    param('id').isMongoId().withMessage('Invalid ID'),
  ],
  authMiddleware.authenticateUser,
  authMiddleware.authorize(['admin']),
  customizationController.acceptOffer
);

// ... Rest of the routes

module.exports = router;

