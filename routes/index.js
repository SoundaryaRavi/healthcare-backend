const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/index');

// Register a new user
router.post('/register', registerUser);

module.exports = router;