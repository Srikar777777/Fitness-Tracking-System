const express = require('express');
const DietPlan = require('../models/DietPlan');  // Import the Diet Plan model
const router = express.Router();

// POST: Calculate BMI
router.post('/bmi', (req, res) => {
  const { weight, height, gender } = req.body;

  if (!weight || !height || !gender) {
    return res.status(400).json({ message: 'Please provide weight, height, and gender.' });
  }

  // BMI formula: weight (kg) / height (m)^2
  const bmi = (weight / (height * height)).toFixed(2);

  let category = '';

  // Determine BMI category based on gender
  if (gender === 'male') {
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';
  } else if (gender === 'female') {
    if (bmi < 18) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';
  }

  res.status(200).json({ bmi, category });
});

// GET: Get diet plan based on gender and goal
router.get('/dietplan/:gender/:goal', async (req, res) => {
  const { gender, goal } = req.params;

  try {
    const dietPlan = await DietPlan.findOne({ gender, goal });
    if (!dietPlan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    res.status(200).json(dietPlan);
  } catch (error) {
    console.error('Error fetching diet plan:', error);
    res.status(500).json({ message: 'Error fetching diet plan' });
  }
});

module.exports = router;
