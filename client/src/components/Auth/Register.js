import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    age: '',
    weight: ''
  });

  const [message, setMessage] = useState(''); // State for messages

  const { name, email, password, phone, address, age, weight } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Ensure that all required fields are sent in the request body
      const body = JSON.stringify({ name, email, password, phone, address, age, weight });

      const res = await axios.post('/api/auth/register', body, config);

      console.log('User registered successfully:', res.data);

      // After successful registration, store the token (JWT) in localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);  // Store the JWT (the 'token')
      }

      // Set success message
      setMessage('Registration successful! You can now log in.');

    } catch (err) {
      console.error(err.response.data);

      // Check for "User already exists" error from backend
      if (err.response && err.response.data.msg === 'User already exists') {
        setMessage('User already exists. Please use a different email.');
      } else {
        setMessage('Error in registration. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={age}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Weight"
            name="weight"
            value={weight}
            onChange={onChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Display the registration status message */}
      {message && <div>{message}</div>}
    </div>
  );
}

export default Register;
