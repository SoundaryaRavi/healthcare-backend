
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuthMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user's role is 'admin'
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }

        // Attach the decoded user data to the request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = adminAuthMiddleware;