const User = require('../models/user');

// Get user profile information
exports.getProfile = async (req, res) => {
  try {
    // Retrieve user information from the database
    const user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user's profile information
    res.json({ profile: user.profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user profile information
exports.updateProfile = async (req, res) => {
  try {
    // Retrieve user information from the database
    const user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user profile with the new information
    user.profile = req.body;

    // Save the updated user profile to the database
    await user.save();

    // Respond with a success message or appropriate data
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    // Retrieve user information from the database
    const user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user password with the new password
    user.password = req.body.password;

    // Save the updated user password to the database
    await user.save();

    // Respond with a success message or appropriate data
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    // Retrieve user information from the database
    const user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Perform any necessary actions to delete the user account
    // For example, you may want to delete associated data or perform additional cleanup tasks.

    // Delete the user account from the database
    await user.remove();

    // Respond with a success message or appropriate data
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
