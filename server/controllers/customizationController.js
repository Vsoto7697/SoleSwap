// Import any necessary models or modules
const CustomizationRequest = require('../models/customizationRequest');
const User = require('../models/user');

// Controller method for creating a new customization request
exports.createCustomizationRequest = async (req, res) => {
  try {
    // Extract the customization request data from the request body
    const { userId, description } = req.body;

    // Check if the user making the request is verified
    const user = await User.findById(userId);
    if (!user || !user.isVerified) {
      return res.status(403).json({ error: 'User is not verified' });
    }

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
};

// Controller method for getting all customization requests
exports.getAllCustomizationRequests = async (req, res) => {
  try {
    // Fetch all customization requests from the database
    const customizationRequests = await CustomizationRequest.find();

    // Respond with the list of customization requests
    res.json(customizationRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for getting a specific customization request by ID
exports.getCustomizationRequestById = async (req, res) => {
  try {
    // Extract the customization request ID from the request parameters
    const { id } = req.params;

    // Find the customization request in the database by ID
    const customizationRequest = await CustomizationRequest.findById(id);

    // If customization request is not found, return an error
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Respond with the customization request object
    res.json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for adding an offer to a customization request
exports.addOfferToCustomizationRequest = async (req, res) => {
  try {
    // Extract the customization request ID and offer data from the request body
    const { requestId, userId, price } = req.body;

    // Check if the user making the offer is verified
    const user = await User.findById(userId);
    if (!user || !user.isVerified) {
      return res.status(403).json({ error: 'User is not verified' });
    }

    // Find the customization request in the database by ID
    const customizationRequest = await CustomizationRequest.findById(requestId);

    // If customization request is not found, return an error
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Add the offer to the customization request's offers array
    customizationRequest.offers.push({ userId, price });

    // Save the customization request with the new offer
    await customizationRequest.save();

    // Respond with the updated customization request object
    res.json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for accepting an offer on a customization request
exports.acceptOffer = async (req, res) => {
  try {
    // Extract the customization request ID and offer ID from the request body
    const { requestId, offerId } = req.body;

    // Find the customization request in the database by ID
    const customizationRequest = await CustomizationRequest.findById(requestId);

    // If customization request is not found, return an error
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Find the offer within the customization request's offers array
    const offer = customizationRequest.offers.id(offerId);

    // If offer is not found, return an error
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    // Update the customization request's status and accepted offer
    customizationRequest.status = 'accepted';
    customizationRequest.acceptedOffer = offer;

    // Save the customization request with the updated offer
    await customizationRequest.save();

    // Respond with the updated customization request object
    res.json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for declining an offer on a customization request
exports.declineOffer = async (req, res) => {
  try {
    // Extract the customization request ID and offer ID from the request body
    const { requestId, offerId } = req.body;

    // Find the customization request in the database by ID
    const customizationRequest = await CustomizationRequest.findById(requestId);

    // If customization request is not found, return an error
    if (!customizationRequest) {
      return res.status(404).json({ error: 'Customization request not found' });
    }

    // Find the offer within the customization request's offers array
    const offer = customizationRequest.offers.id(offerId);

    // If offer is not found, return an error
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    // Remove the offer from the customization request's offers array
    offer.remove();

    // Save the customization request with the updated offers
    await customizationRequest.save();

    // Respond with the updated customization request object
    res.json(customizationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method for deleting a customization request
exports.deleteCustomizationRequest = async (req, res) => {
  try {
    // Extract the customization request ID from the request parameters
    const { id } = req.params;

    // Find and delete the customization request from the database
    await CustomizationRequest.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: 'Customization request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
