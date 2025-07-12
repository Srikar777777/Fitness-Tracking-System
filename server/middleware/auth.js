const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

module.exports = function (req, res, next) {
  // Extract the token from the Authorization header
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Check for Bearer <token> format

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the user payload to the request
    next(); // Pass control to the next middleware
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
