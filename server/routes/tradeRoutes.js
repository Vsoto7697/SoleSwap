const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

// Route: POST /api/trades
router.post('/', tradeController.createTrade);

// Route: GET /api/trades
router.get('/', tradeController.getTrades);

// Route: GET /api/trades/:id
router.get('/:id', tradeController.getTradeById);

// Route: PUT /api/trades/:id
router.put('/:id', tradeController.updateTrade);

// Route: DELETE /api/trades/:id
router.delete('/:id', tradeController.deleteTrade);

module.exports = router;
