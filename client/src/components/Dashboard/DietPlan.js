import React, { useState } from 'react';

const DietPlan = () => {
  const [gender, setGender] = useState(''); // Gender state
  const [bmi, setBmi] = useState('');       // BMI state
  const [dietPlan, setDietPlan] = useState(''); // Diet plan state

  // Function to calculate diet plan based on gender and BMI
  const getDietPlan = () => {
    let plan = '';

    if (gender === 'male') {
      if (bmi < 18.5) {
        plan = 'Increase your caloric intake with protein-rich and nutrient-dense foods.';
      } else if (bmi >= 18.5 && bmi < 25) {
        plan = 'Maintain a balanced diet with lean proteins, vegetables, and whole grains.';
      } else {
        plan = 'Focus on a low-carb, high-protein diet and avoid sugary snacks.';
      }
    } else if (gender === 'female') {
      if (bmi < 18.5) {
        plan = 'Increase calorie intake with healthy fats, proteins, and vitamins.';
      } else if (bmi >= 18.5 && bmi < 25) {
        plan = 'Follow a balanced diet including fruits, vegetables, and lean proteins.';
      } else {
        plan = 'Opt for a diet rich in fiber, vegetables, and low-calorie foods.';
      }
    } else {
      plan = 'Please select a gender and enter a valid BMI.';
    }

    setDietPlan(plan); // Update diet plan state
  };

  return (
    <div className="dashboard-container">
      <h2>Diet Plan Generator</h2>
      
      {/* Gender selection */}
      <div className="input-section">
        <label>Select Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">--Select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* BMI input */}
      <div>
        <label>Enter BMI:</label>
        <input
          type="number"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
          placeholder="Enter your BMI"
        />
      </div>

      {/* Button to generate diet plan */}
      <button onClick={getDietPlan}>Get Diet Plan</button>

      {/* Display the diet plan */}
      {dietPlan && (
        <div>
          <h3>Your Diet Plan:</h3>
          <p>{dietPlan}</p>
        </div>
      )}
    </div>
  );
};

export default DietPlan;
