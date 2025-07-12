const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = process.env.JWT_SECRET;

const router = express.Router();

// Register User
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('age', 'Age must be a number').isNumeric(),
    check('weight', 'Weight must be a number').isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, address, age, weight } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });

      if (user) {
        // If user exists, return an error message
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user with all required fields
      user = new User({
        name,
        email,
        password,
        phone,
        address,
        age,
        weight
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Generate JWT (you might want to send this to the frontend for auth)
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, config, { expiresIn: '1h' });

      // Return token and success message
      res.json({ token, msg: 'User registered successfully' });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Login User
// Login User
router.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: 'No account found with this email' });
        }
  
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }
  
        // Create JWT token
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          process.env.JWT_SECRET,  // Use process.env to access JWT_SECRET directly
          { expiresIn: 360000 }, // Set expiration time
          (err, token) => {
            if (err) throw err;
            res.json({ token }); // Return token
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );
  
module.exports = router;
