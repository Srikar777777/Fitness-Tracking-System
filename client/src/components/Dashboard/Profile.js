import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    phone: '',
    address: '',
    age: '',
    weight: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        
        setProfile(res.data);
        // Initialize updatedProfile with the data fetched
        setUpdatedProfile({
          name: res.data.name || '',
          phone: res.data.phone || '',
          address: res.data.address || '',
          age: res.data.age || '',
          weight: res.data.weight || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUpdatedProfile({
      ...updatedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/users/profile', updatedProfile, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Log the server response to see if it's correct
      console.log("Server response:", res.data);
  
      // Update the profile and updatedProfile states
      setProfile(res.data);
      setUpdatedProfile({
        name: res.data.name || '',
        phone: res.data.phone || '',
        address: res.data.address || '',
        age: res.data.age || '',
        weight: res.data.weight || '',
      });
  
      setIsEditMode(false);  // Exit edit mode
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Error updating profile');
      console.error("Error updating profile:", err);
    }
  };  

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      {profile ? (
        <div className="buttons-container">
          {isEditMode ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email: </label>
                <input type="text" value={profile.email} disabled />
              </div>
              <div>
                <label>Username: </label>
                <input
                  type="text"
                  name="name"
                  value={updatedProfile.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Phone: </label>
                <input
                  type="text"
                  name="phone"
                  value={updatedProfile.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Address: </label>
                <input
                  type="text"
                  name="address"
                  value={updatedProfile.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Age: </label>
                <input
                  type="number"
                  name="age"
                  value={updatedProfile.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Weight: </label>
                <input
                  type="number"
                  name="weight"
                  value={updatedProfile.weight}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Update Profile</button>
              <button type="button" onClick={() => setIsEditMode(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>name:</strong> {profile.name || 'Not provided'}</p>
              <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {profile.address || 'Not provided'}</p>
              <p><strong>Age:</strong> {profile.age || 'Not provided'}</p>
              <p><strong>Weight:</strong> {profile.weight || 'Not provided'}</p>

              <button onClick={() => setIsEditMode(true)}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
