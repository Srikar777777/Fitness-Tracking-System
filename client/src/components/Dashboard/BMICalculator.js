import React, { useState } from 'react';
import axios from 'axios';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState(null);

  const calculateBMI = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bmidiet/bmi', { weight, height, gender });
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <div>
          <label>
            Weight (kg):
          </label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>
            Height (m):
          </label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} step="0.01" required />
        </div>
        <div>
          <label>
            Gender:
          </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit">Calculate BMI</button>
      </form>

      {result && (
        <div className="input-section">
          <h3>Your BMI: {result.bmi}</h3>
          <p>Category: {result.category}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
