const mongoose = require('mongoose');

const FitnessRecordSchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FitnessRecord', FitnessRecordSchema);
