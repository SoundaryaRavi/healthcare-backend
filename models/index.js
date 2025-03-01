const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Removes extra spaces
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Ensures email is unique
        trim: true,
        lowercase: true, // Converts email to lowercase
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'], // Validates email format
    },
    age: {
        type: Number,
        required: true, // Age is required
        min: [18, 'Age must be at least 18'], // Minimum age validation
        max: [100, 'Age must be less than 100'], // Maximum age validation
    },
    password: {
        type: String,
        required: true, // Password is required
        minlength: [6, 'Password must be at least 6 characters long'], // Minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically sets the update date
    },
});

// Middleware to update the `updatedAt` field before saving
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the User Model
const User = mongoose.model('User', userSchema);

// Export the User Model
module.exports = User;