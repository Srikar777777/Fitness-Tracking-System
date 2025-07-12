import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Stopwatch = () => {
  const [activityName, setActivityName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [isStopped, setIsStopped] = useState(false); // Track if the timer is stopped
  const [message, setMessage] = useState('');
  
  // Use useRef to keep track of interval ID
  const intervalRef = useRef(null);

  // Handle input change
  const handleActivityNameChange = (e) => {
    setActivityName(e.target.value);
  };

  // Start the timer
  const startTimer = () => {
    setIsActive(true);
    setIsStopped(false); // Reset stop flag when restarting
    setMessage(''); // Clear any previous messages
  };

  // Stop the timer
  const stopTimer = () => {
    setIsActive(false);
    setIsStopped(true); // Mark as stopped
  };

  // Effect to increment the timer when it's active
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timer]); // Add 'interval' dependency

  // Convert timer from seconds to hh:mm:ss format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const saveActivity = async () => {
    const caloriesBurned = Math.floor(timer / 60) * 10; // Simple calculation: 10 calories per minute
    console.log("Payload being sent:", {
      activityName,
      minutes: Math.floor(timer / 60), // Save time in minutes
      caloriesBurned, // Send calculated or static value
      date: new Date().toISOString(), // Save the current date
    });
  
    try {
      const res = await axios.post('http://localhost:5000/api/fitnessRecords', {
        activityName,
        minutes: Math.floor(timer / 60), // Save time in minutes
        caloriesBurned, // Send calculated or static value
        date: new Date().toISOString(), // Save the current date
      });
  
      if (res.status === 201) {
        setMessage('Activity saved successfully!');
        setTimer(0);
        setActivityName('');
        setIsStopped(false);
      }
    } catch (error) {
      console.error('Error saving activity:', error);
      if (error.response) {
        setMessage(`Failed to save activity: ${error.response.data.message}`);
      } else {
        setMessage('Failed to save activity.');
      }
    }
  };
  
  return (
    <div className="dashboard-container">
      <h1>Stopwatch</h1>

      <div className="input-section">
        <label htmlFor="activityName">Activity Name: </label>
        <input
          type="text"
          id="activityName"
          value={activityName}
          onChange={handleActivityNameChange}
          placeholder="Enter activity name"
          disabled={isActive} // Disable input when the timer is running
        />
      </div>

      <div>
        <h2>{activityName ? `Activity: ${activityName}` : 'No activity entered'}</h2>
        <h2>Time: {formatTime(timer)}</h2>
      </div>

      <div>
        <button onClick={startTimer} disabled={isActive || !activityName}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isActive}>
          Stop
        </button>
        {isStopped && (
          <button onClick={saveActivity} disabled={!activityName}>
            Save
          </button>
        )}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Stopwatch;
