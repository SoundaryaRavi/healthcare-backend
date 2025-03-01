const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/index');

// Register a new user
router.post('/register', registerUser);
// Login route
router.get('/login', loginUser);


module.exports = router;