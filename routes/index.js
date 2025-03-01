const express = require('express');
const router = express.Router();
const { registerUser, loginUser, fetchUserById, fetchAdminById, fetchAllPatients } = require('../controllers/index');
const authMiddleware = require('../middlewares/auth');
const adminAuthMiddleware = require('../middlewares/adminAuth');

// Register a new user
router.post('/register', registerUser);
// Login route
router.post('/login', loginUser);

// Protected route
router.get('/users/:id', authMiddleware, fetchUserById);

router.get('/admin/:id', adminAuthMiddleware, fetchAdminById);

router.get('/users/admin/:id', adminAuthMiddleware, fetchAllPatients);




module.exports = router;