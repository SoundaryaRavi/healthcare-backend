const User = require('../models/index');


const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const newUser = new User({
          email,
          password,
          role: role || 'patient', // Default role is 'user'
      });

      // Save the user to the database
      await newUser.save();

      // Respond with the created user (excluding the password)
      res.status(201).json({
          _id: newUser._id,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
      });
  } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser };