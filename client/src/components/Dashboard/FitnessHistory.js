import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

const FitnessHistory = () => {
  const [records, setRecords] = useState([]);
  const [editRecordId, setEditRecordId] = useState(null); // Track which record is being edited
  const [formData, setFormData] = useState({
    activityName: '',
    minutes: '',
    caloriesBurned: '',  // Added caloriesBurned to the formData state
    date: '',
  });
  const [message, setMessage] = useState('');

  // Fetch records from the backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/fitnessRecords');
        setRecords(res.data);
      } catch (err) {
        console.error('Error fetching records:', err);
      }
    };

    fetchRecords();
  }, []);

  // Handle input change for editing
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enable editing for a specific record
  const onEditClick = (record) => {
    setEditRecordId(record._id);
    setFormData({
      activityName: record.activityName,
      minutes: record.minutes,
      caloriesBurned: record.caloriesBurned,  // Populate caloriesBurned for editing
      date: new Date(record.date).toISOString().split('T')[0], // Format date as yyyy-mm-dd
    });
  };

  // Save the edited record
  const onSaveClick = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/fitnessRecords/${editRecordId}`,
        formData
      );
      console.log('Record updated successfully:', res.data);
      setMessage('Record updated successfully');
      // Update the local state to reflect changes
      setRecords(records.map((record) => (record._id === editRecordId ? res.data : record)));
      setEditRecordId(null); // Close the edit form
    } catch (err) {
      console.error('Error updating record:', err);
      setMessage('Error updating record');
    }
  };

  // Delete the selected record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fitnessRecords/${id}`);
      setRecords(records.filter((record) => record._id !== id));
      setMessage('Record deleted successfully');
    } catch (err) {
      console.error('Error deleting record:', err);
      setMessage('Error deleting record');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Fitness History</h1>
      <table>
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>Minutes</th>
            <th>Calories Burned</th> {/* Added Calories Burned column */}
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record._id}>
                <td>
                  {editRecordId === record._id ? (
                    <input
                      type="text"
                      name="activityName"
                      value={formData.activityName}
                      onChange={onChange}
                    />
                  ) : (
                    record.activityName
                  )}
                </td>
                <td>
                  {editRecordId === record._id ? (
                    <input
                      type="number"
                      name="minutes"
                      value={formData.minutes}
                      onChange={onChange}
                    />
                  ) : (
                    record.minutes
                  )}
                </td>
                <td>
                  {editRecordId === record._id ? (
                    <input
                      type="number"
                      name="caloriesBurned"
                      value={formData.caloriesBurned}
                      onChange={onChange}
                    />
                  ) : (
                    record.caloriesBurned
                  )}
                </td>
                <td>
                  {editRecordId === record._id ? (
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={onChange}
                    />
                  ) : (
                    new Date(record.date).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editRecordId === record._id ? (
                    <button className="save" onClick={onSaveClick}>Save</button>
                  ) : (
                    <>
                      <button className="edit" onClick={() => onEditClick(record)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(record._id)}>Delete</button> {/* Delete Button */}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
      {message && <div>{message}</div>} {/* Display success/failure message */}
    </div>
  );
};

export default FitnessHistory;
