const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  date: { type: String, required: true },
  reserved: { type: Boolean, default: false },  // Use 'reserved' instead of 'booked'
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
