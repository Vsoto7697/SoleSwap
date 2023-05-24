const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  // Extract the registration data from req.body
  const { email, password, firstName, lastName, photoID, sellingHistory } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      photoID,
      sellingHistory,
      isVerified: false, // Initially set the verification status to false
    });

    // Save the user to the database
    await user.save();

    // Send a verification email to the user's email address

    // Respond with a success message or appropriate data
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  // Extract the login credentials from req.body
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the user's hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate an authentication token (e.g., using JWT)

    // Respond with the token or appropriate data
    res.json({ token: 'your-auth-token' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// The remaining functions remain the same

exports.logout = (req, res) => {
  // Perform any necessary tasks to log out the user
  // For example, invalidate the authentication token

  // Respond with a success message or appropriate data
  res.json({ message: 'User logged out successfully' });
};

exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // Find the user based on the email and token
    const user = await User.findOne({ email, resetToken: token });

    if (!user) {
      return res.status(404).json({ error: 'Invalid email or token' });
    }

    // Check if the token has expired (you may have an expiry date stored with the token)
    if (user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ error: 'Token has expired' });
    }

    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    console.log('newPassword:', newPassword);
    console.log('salt:', salt);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log('hashedPassword:', hashedPassword);

    // Update the user's password and reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    // Respond with a success message or appropriate data
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.verifyEmail = (req, res) => {
  // Implement the logic for email verification
  // This may involve verifying a token or link sent to the user's email address

  // Update the user's verification status or assign a verification badge
};
