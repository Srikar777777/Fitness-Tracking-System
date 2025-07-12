const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure correct model path
const auth = require('../middleware/auth');

// GET route to fetch profile
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id; // Use the ID from the token
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user); // Send user data
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// In your server routes (e.g., /api/users/profile)
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, address, age, weight } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user profile fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.age = age || user.age;
    user.weight = weight || user.weight;

    await user.save();
    res.json(user);  // Send back updated user data
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
