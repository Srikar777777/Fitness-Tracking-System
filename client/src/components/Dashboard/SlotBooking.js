import React, { useState } from 'react';
import axios from 'axios';

const SlotBooking = () => {
  const [slotId, setSlotId] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/slots/book', { slotId });
      setMessage(response.data.msg); // Display success message
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg); // Display error message
      } else {
        setMessage('Error occurred while booking the slot');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Book a Slot</h2>
      <input 
        type="text" 
        placeholder="Enter Slot ID" 
        value={slotId}
        onChange={(e) => setSlotId(e.target.value)} 
      />
      <button onClick={handleBooking}>Book Slot</button>
      <p>{message}</p>
    </div>
  );
};

export default SlotBooking;
