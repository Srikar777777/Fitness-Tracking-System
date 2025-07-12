const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
/*// GET route to fetch profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;  // Assuming you have user data in the token
    const user = await User.findById(userId).select('-password');  // Exclude password from response

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);  // Send the user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT route to update profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser);  // Return updated user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});*/

module.exports = router;
