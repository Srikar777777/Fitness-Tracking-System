import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for redirection

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ email, password });

      const res = await axios.post('/api/auth/login', body, config);
      console.log('User logged in successfully:', res.data);

      // Store token in localStorage (optional)
      localStorage.setItem('token', res.data.token);

      // Redirect to dashboard on success
      setMessage('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard

    } catch (err) {
      console.error(err.response.data);
      if (err.response && err.response.data.msg === 'No account found with this email') {
        setMessage('No account found with this email.');
      } else if (err.response && err.response.data.msg === 'Invalid credentials') {
        setMessage('Invalid credentials.');
      } else {
        setMessage('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
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
        <button type="submit">Login</button>
      </form>

      {/* Display login status message */}
      {message && <div>{message}</div>}
    </div>
  );
}

export default Login;
