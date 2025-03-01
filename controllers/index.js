const User = require('../models/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Respond with the token
      res.status(200).json({ token, email, id: user._id });
  } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };