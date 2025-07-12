const express = require('express');
const router = express.Router();
const FitnessRecord = require('../models/FitnessRecord'); // Ensure the correct model path
const User = require('../models/User');

// POST route for adding a fitness record
router.post('/', async (req, res) => {
  const { activityName, minutes, date, caloriesBurned } = req.body;

  // Check if caloriesBurned is defined
  /*if (!caloriesBurned) {
    return res.status(400).json({ message: 'Calories burned is required' });
  }*/

  try {
    const newRecord = new FitnessRecord({
      activityName,
      minutes,
      caloriesBurned,  // Make sure it's used here
      date,
    });

    await newRecord.save();
    res.status(201).json(newRecord); // Respond with the created record
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET route for retrieving all fitness records
router.get('/', async (req, res) => {
  try {
    const records = await FitnessRecord.find(); // Get all fitness records from the database
    res.status(200).json(records); // Return the records in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// In fitnessRecords.js
router.put('/:id', async (req, res) => {
  const { id } = req.params;  // Extract the ID from the URL
  const { activityName, minutes, caloriesBurned, date } = req.body;

  try {
    const record = await FitnessRecord.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Update the record with the new data
    record.activityName = activityName || record.activityName;
    record.minutes = minutes || record.minutes;
    record.caloriesBurned = caloriesBurned || record.caloriesBurned;
    record.date = date || record.date;

    await record.save();  // Save the updated record
    res.status(200).json(record);  // Respond with the updated record
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a specific fitness record by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the record by ID and delete it
    const deletedRecord = await FitnessRecord.findByIdAndDelete(id);

    // If the record does not exist
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully', record: deletedRecord });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ message: 'Error deleting record' });
  }
});


module.exports = router;
