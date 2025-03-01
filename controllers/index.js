const User = require('../models/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');

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

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' } // Token expires in 1 hour
    );

      // Respond with the created user (excluding the password)
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        token, // Include the JWT token in the response
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

const fetchUserById = async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters

  try {
      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Find the user by ID
      const user = await User.findById(id).select('-password'); // Exclude the password field

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Return the user data
      res.status(200).json(user);
  } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Server error' });
  }
};

const fetchAdminById = async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters

  try {
      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Find the user by ID
      const user = await User.findById(id).select('-password'); // Exclude the password field

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (user.role != 'admin') {
        return res.status(404).json({ message: 'User is not admin' });
      }

      // Return the user data
      res.status(200).json(user);
  } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Server error' });
  }
};

const fetchAllPatients = async (req, res) => {
    try {
        // Find all users with the role 'patient'
        const patients = await User.find({ role: 'patient' }).select('-password'); // Exclude the password field

        // Return the list of patients
        res.status(200).json(patients);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters
  const { first_name, age, health_issues, weight, height } = req.body; // Get the fields to update

  try {
      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Find the user by ID and update the fields
      const updatedUser = await User.findByIdAndUpdate(
          id,
          { first_name, age, health_issues, weight, height },
          { new: true, runValidators: true } // Return the updated document and run schema validators
      ).select('-password'); // Exclude the password field from the response

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Return the updated user data
      res.status(200).json(updatedUser);
  } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { registerUser, loginUser, fetchUserById, fetchAdminById, fetchAllPatients, updateUser };