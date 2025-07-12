const express = require('express');
const Slot = require('../models/Slot');  // Import the Slot model
const router = express.Router();  // Use the express Router

// POST request to reserve a slot
router.post('/book', async (req, res) => {
  const { slotId } = req.body;

  try {
    // Find the slot by ID
    const slot = await Slot.findById(slotId);

    // If the slot does not exist
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // If the slot is already reserved
    if (slot.reserved) {
      return res.status(400).json({ message: 'Slot already reserved' });
    }

    // Mark the slot as reserved
    slot.reserved = true;  // Use 'reserved' instead of 'booked'
    await slot.save();  // Save the updated slot

    res.status(200).json({ message: 'Slot reserved successfully', slot });
  } catch (error) {
    console.error('Error reserving slot:', error);
    res.status(500).json({ message: 'Error reserving slot' });
  }
});

// GET request to fetch reserved slots
router.get('/reserved', async (req, res) => {
  try {
    // Fetch all slots where reserved = true
    const reservedSlots = await Slot.find({ reserved: true });
    res.status(200).json(reservedSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reserved slots' });
  }
});

// GET request to fetch available slots (unreserved)
router.get('/available', async (req, res) => {
  try {
    // Fetch all slots where reserved = false
    const availableSlots = await Slot.find({ reserved: false });
    res.status(200).json(availableSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching available slots' });
  }
});


module.exports = router;  // Export the router
