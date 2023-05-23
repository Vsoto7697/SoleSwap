// controllers/restorationController.js
const RestorationRequest = require('../models/restorationRequest');

// Handle restoration request creation
exports.createRestorationRequest = async (req, res) => {
  try {
    const { userId, shoeModel, description } = req.body;

    // Create a new restoration request object
    const restorationRequest = new RestorationRequest({
      userId,
      shoeModel,
      description,
      status: 'pending',
      price: null,
    });

    // Save the restoration request to the database
    await restorationRequest.save();

    res.json({ message: 'Restoration request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all restoration requests
exports.getAllRestorationRequests = async (req, res) => {
  try {
    const restorationRequests = await RestorationRequest.find();

    res.json(restorationRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific restoration request by ID
exports.getRestorationRequestById = async (req, res) => {
  try {
    const restorationRequest = await RestorationRequest.findById(req.params.id);

    if (!restorationRequest) {
      return res.status(404).json({ error: 'Restoration request not found' });
    }

    res.json(restorationRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update the price of a restoration request
exports.updateRestorationRequestPrice = async (req, res) => {
  try {
    const { price } = req.body;

    const restorationRequest = await RestorationRequest.findById(req.params.id);

    if (!restorationRequest) {
      return res.status(404).json({ error: 'Restoration request not found' });
    }

    restorationRequest.price = price;
    await restorationRequest.save();

    res.json({ message: 'Restoration request price updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Decline the price of a restoration request
exports.declineRestorationRequestPrice = async (req, res) => {
  try {
    const restorationRequest = await RestorationRequest.findById(req.params.id);

    if (!restorationRequest) {
      return res.status(404).json({ error: 'Restoration request not found' });
    }

    restorationRequest.price = null;
    await restorationRequest.save();

    res.json({ message: 'Restoration request price declined successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
