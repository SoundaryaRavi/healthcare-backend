const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/index');
const goalTracker = require('./goalTracker');

// Register a new user
router.post('/register', registerUser);

router.use('/goalTracker', goalTracker);

module.exports = router;