import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableSlots = () => {
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch available slots on component mount
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/slots/available');
        setAvailableSlots(response.data);
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    };

    fetchAvailableSlots();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Available Slots</h1>
      {availableSlots.length > 0 ? (
        <ul>
          {availableSlots.map((slot) => (
            <li key={slot._id}>
              Date: {slot.date}, Time: {slot.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No available slots at the moment.</p>
      )}
    </div>
  );
};

export default AvailableSlots;
