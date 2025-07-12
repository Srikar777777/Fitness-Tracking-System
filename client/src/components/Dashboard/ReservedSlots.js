import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservedSlots = () => {
  const [reservedSlots, setReservedSlots] = useState([]);

  // Fetch reserved slots on component mount
  useEffect(() => {
    const fetchReservedSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/slots/reserved');
        setReservedSlots(response.data);
      } catch (error) {
        console.error('Error fetching reserved slots:', error);
      }
    };

    fetchReservedSlots();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Reserved Slots</h1>
      {reservedSlots.length > 0 ? (
        <ul>
          {reservedSlots.map((slot) => (
            <li key={slot._id}>
              Date: {slot.date}, Time: {slot.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reserved slots available.</p>
      )}
    </div>
  );
};

export default ReservedSlots;
