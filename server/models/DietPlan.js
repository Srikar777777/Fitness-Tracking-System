const mongoose = require('mongoose');

// Diet Plan Schema
const dietPlanSchema = new mongoose.Schema({
  gender: { type: String, enum: ['male', 'female'], required: true },
  goal: { type: String, enum: ['weight loss', 'muscle gain', 'maintenance'], required: true },
  plan: { type: String, required: true },  // Plan details as a string or array
});

// Diet Plan model
const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

module.exports = DietPlan;
