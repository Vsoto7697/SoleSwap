// Import any necessary models or modules
const { body, param, validationResult } = require('express-validator');
const CustomizationRequest = require('../models/CustomizationRequest');

// Controller method for creating a new customization request
exports.createCustomizationRequest = [
  // Input validation using express-validator
  body('userId').notEmpty().withMessage('User ID is required'),
  body('description').notEmpty().withMessage('Description is required'),

  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract the customization request data from the request body
      const { userId, description } = req.body;

      // Create a new customization request object
      const customizationRequest = new CustomizationRequest({
        userId,
        description,
        status: 'pending',
        offers: [],
      });

      // Save the customization request to the database
      await customizationRequest.save();

      // Respond with the created customization request object
      res.status(201).json(customizationRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
];

// Controller method for getting all customization requests
exports.getAllCustomizationRequests = async (req, res) => {
  // Implementation code...
};

// Controller method for getting a customization request by ID
exports.getCustomizationRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID parameter using express-validator
    await param('id').isMongoId().withMessage('Invalid ID').run(req);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Retrieve the customization request from the database by ID
    const customizationRequest = await CustomizationRequest.findById(id);

    // Check if the customization request exists
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Respond with the customization request
    res.status(200).json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Rest of the controller methods...
// (addOfferToCustomizationRequest, acceptOffer, declineOffer, deleteCustomizationRequest)

// Rest of the controller methods...
// (addOfferToCustomizationRequest, acceptOffer, declineOffer, deleteCustomizationRequest)

// Controller method for adding an offer to a customization request
exports.addOfferToCustomizationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { offerAmount } = req.body;

    // Retrieve the customization request from the database by ID
    const customizationRequest = await CustomizationRequest.findById(id);

    // Check if the customization request exists
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Add the offer to the customization request
    customizationRequest.offers.push({
      amount: offerAmount,
    });

    // Save the customization request with the new offer
    await customizationRequest.save();

    // Respond with the updated customization request
    res.status(200).json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for accepting an offer for a customization request
exports.acceptOffer = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the customization request from the database by ID
    const customizationRequest = await CustomizationRequest.findById(id);

    // Check if the customization request exists
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Update the customization request status to "accepted"
    customizationRequest.status = 'accepted';

    // Save the updated customization request
    await customizationRequest.save();

    // Respond with the updated customization request
    res.status(200).json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for declining an offer for a customization request
exports.declineOffer = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the customization request from the database by ID
    const customizationRequest = await CustomizationRequest.findById(id);

    // Check if the customization request exists
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Update the customization request status to "declined"
    customizationRequest.status = 'declined';

    // Save the updated customization request
    await customizationRequest.save();

    // Respond with the updated customization request
    res.status(200).json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for deleting a customization request
exports.deleteCustomizationRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the customization request from the database
    await CustomizationRequest.findByIdAndDelete(id);

    // Respond with a success message
    res.status(200).json({ message: 'Customization request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the controller methods
module.exports = {
  createCustomizationRequest,
  getAllCustomizationRequests,
  getCustomizationRequestById,
  addOfferToCustomizationRequest,
  acceptOffer,
  declineOffer,
  deleteCustomizationRequest,
};
