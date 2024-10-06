import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to get the CSRF token from cookies
const getCSRFToken = () => {
  let token = null;
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      token = value;
    }
  });
  return token;
};

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setErrorMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = {
      username: name,
      email: email,
      password1: password,
      password2: password2,
    };

    console.log('Form data being sent:', formData);

    const csrftoken = getCSRFToken(); // Get CSRF token from cookies

    try {
      // Make the POST request to the correct backend URL (Django API running on localhost:8000)
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, // Include CSRF token in the headers
        },
        body: JSON.stringify(formData),
      });

      // Log the response status and text
      console.log('Response status:', response.status);
      const responseText = await response.text(); // Get the raw response text
      console.log('Response text:', responseText); // Log it

      // Try to parse JSON if the response was okay
      const data = response.ok ? JSON.parse(responseText) : { message: responseText };
      if (response.ok) {
        console.log('Registration successful!');
        setName('');
        setEmail('');
        setPassword('');
        setPassword2('');
        navigate('/login'); // Redirect to login after successful registration
      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-[#7bb2f2] p-8 rounded-lg shadow-md w-3/4 max-w-lg">
        <h2 className="text-white text-2xl font-bold mb-6">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password2">Confirm Password</label>
            <input
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none"
              type="password"
              id="password2"
              placeholder="Confirm your password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;