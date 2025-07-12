import React from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  // Sign out function
  const handleSignOut = () => {
    // Clear authentication token (or any session data)
    localStorage.removeItem('authToken');

    // Redirect the user to the sign-in page
    navigate('/login');
  };


  return (
    <div className="dashboard-background">
    <div className="dashboard-container2">
      <div className="buttons-container">
      <h1 style={{ fontSize: '40px' }}>My Dashboard</h1>
      <button onClick={() => navigate('/add-record')}>Add Record</button>
      <button onClick={() => navigate('/fitness-history')}>Fitness History</button>
      <button onClick={() => navigate('/calorie-calculator')}>Calorie Calculator</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={() => navigate('/bookslots')}>Slots Booking</button>
      <button onClick={() => navigate('/availableslots')}>Slots Available</button>
      <button onClick={() => navigate('/reservedslots')}>Reserved Slots</button>
      <button onClick={() => navigate('/bmi')}>BMI Calculator</button>
      <button onClick={() => navigate('/stopwatch')}>Stop Watch</button>
      <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
