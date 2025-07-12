import React, { useState } from 'react';
import axios from 'axios';

const AddRecord = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    minutes: '',
    caloriesBurned: '',  // New field for calories burned
    date: new Date().toISOString().split('T')[0],  // Automatically set the current date
  });

  const { activityName, minutes, caloriesBurned, date } = formData;
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/fitnessRecords', formData);  // Ensure URL is correct
      console.log('Record added successfully:', res.data);
      setMessage('Record added successfully');
    
    } catch (err) {
      console.error('Error adding record:', err);
      setMessage('Error adding record');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Add Record</h1>
      <form onSubmit={onSubmit}>
        <div className="input-section">
          <input
            type="text"
            name="activityName"
            value={activityName}
            onChange={onChange}
            placeholder="Activity Name"
            required
          />
        </div>
        <div className="input-section">
          <input
            type="number"
            name="minutes"
            value={minutes}
            onChange={onChange}
            placeholder="Minutes"
            required
          />
        </div>
        <div className="input-section">
          <input
            type="number"
            name="caloriesBurned"
            value={caloriesBurned}
            onChange={onChange}
            placeholder="Calories Burned"
            required
          />
        </div>
        <div className="input-section">
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Add Record</button>
      </form>
      {message && <div>{message}</div>} {/* Display success/failure message */}
    </div>
  );
};

export default AddRecord;
