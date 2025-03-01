const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['patient', 'admin'], // Restrict role to 'user' or 'admin'
        default: 'user', // Default role is 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    age: {
        type: Number,
        min: [0, 'Age must be a positive number'],
    },
    health_issues: {
        type: [String], // Array of strings
        default: [],
    },
    weight: {
        type: Number,
        min: [0, 'Weight must be a positive number'],
    },
    height: {
        type: Number,
        min: [0, 'Height must be a positive number'],
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;