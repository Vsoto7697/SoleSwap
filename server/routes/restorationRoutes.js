const express = require('express');
const restorationController = require('../controllers/restorationController');
const router = express.Router();

// Route: POST /api/restoration-requests
router.post('/', restorationController.createRestorationRequest);

// Route: GET /api/restoration-requests
router.get('/', restorationController.getAllRestorationRequests);

// Route: GET /api/restoration-requests/:id
router.get('/:id', restorationController.getRestorationRequestById);

// Route: PUT /api/restoration-requests/:id/price
router.put('/:id/price', restorationController.updateRestorationRequestPrice);

// Route: DELETE /api/restoration-requests/:id/price
router.delete('/:id/price', restorationController.declineRestorationRequestPrice);

module.exports = router;
