// Import any necessary models or modules
const { body, validationResult } = require('express-validator');
const User = require('./user');
const Customization = require('./CustomizationRequest');

// Controller method for creating a new customization request
exports.createCustomizationRequest = [
  // Input validation using express-validator
  body('requester').notEmpty().withMessage('Requester ID is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),

  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract the customization request data from the request body
      const { requester, description, price } = req.body;

      // Check if the requester making the request is verified
      const user = await User.findById(requester);
      if (!user || !user.isVerified) {
        return res.status(403).json({ error: 'Requester is not verified' });
      }

      // Create a new customization request object
      const customizationRequest = new Customization({
        requester,
        description,
        price,
        isAccepted: false,
        isCompleted: false,
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
  try {
    // Retrieve all customization requests from the database
    const customizationRequests = await Customization.find();

    // Respond with the customization requests
    res.json(customizationRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Rest of the controller methods...
// (getCustomizationRequestById, addOfferToCustomizationRequest, acceptOffer, declineOffer, deleteCustomizationRequest)
