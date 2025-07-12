const Slot = require('../models/Slot');

// Get all available slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ available: true });
    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Book a slot
exports.bookSlot = async (req, res) => {
  const { slotId } = req.body;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot || !slot.available) {
      return res.status(400).json({ msg: 'Slot is not available' });
    }

    slot.available = false;
    slot.user = req.user.id;

    await slot.save();

    res.json({ msg: 'Slot booked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new slot (for admin use)
exports.createSlot = async (req, res) => {
  const { date, time } = req.body;

  try {
    const newSlot = new Slot({ date, time });
    await newSlot.save();
    res.json(newSlot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
