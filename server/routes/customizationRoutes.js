const express = require('express');
const router = express.Router();
const customizationController = require('../controllers/customizationController');

// Route: POST /api/customization
router.post('/', customizationController.createCustomizationRequest);

// Route: GET /api/customization
router.get('/', customizationController.getAllCustomizationRequests);

// Route: GET /api/customization/:id
router.get('/:id', customizationController.getCustomizationRequestById);

// Route: POST /api/customization/:id/offers
router.post('/:id/offers', customizationController.addOfferToCustomizationRequest);

// Route: POST /api/customization/:id/accept-offer
router.post('/:id/accept-offer', customizationController.acceptOffer);

// Route: POST /api/customization/:id/decline-offer
router.post('/:id/decline-offer', customizationController.declineOffer);

// Route: DELETE /api/customization/:id
router.delete('/:id', customizationController.deleteCustomizationRequest);

module.exports = router;
