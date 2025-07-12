import React, { useState } from 'react';

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    minutes: '',
    weight: '',
  });

  const { activityName, minutes, weight } = formData;
  const [calories, setCalories] = useState(null);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateCalories = () => {
    // For simplicity, assume calories burned = minutes * weight * 0.0175
    const result = minutes * weight * 0.0175;
    setCalories(result);
  };

  return (
    <div className="dashboard-container">
      <input type="text" name="activityName" value={activityName} onChange={onChange} placeholder="Activity Name" />
      <input type="number" name="minutes" value={minutes} onChange={onChange} placeholder="Minutes" />
      <input type="number" name="weight" value={weight} onChange={onChange} placeholder="Weight" />
      <button onClick={calculateCalories}>Calculate Calories</button>

      {calories && <p>Calories Burned: {calories}</p>}
    </div>
  );
};

export default CalorieCalculator;
