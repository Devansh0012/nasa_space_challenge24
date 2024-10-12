import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import the images
import personImage from "../pages/cardImages/person.png";
import plantImage from "../pages/cardImages/flower.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      if (response.data.success) {
        navigate("/sdg-info");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
      {/* Inline CSS Styles for Animations */}
      <style>
        {`
          .form-container {
            background-color: #a8edea;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            position: relative;
            max-width: 400px;
            width: 100%;
            z-index: 2;
          }

          /* Image of person */
          .person-image {
            position: absolute;
            top: calc(-50px + 270px); /* Move above the form */
            left: calc(50% + 270px); /* Start at the center */
            transform: translateX(-50%); /* Adjust to center horizontally */
            width: 200px;
            z-index: 1;
          }

          /* Image of plant */
          .plant-image {
            position: absolute;
            bottom: calc(-60px + 230px); /* Move below the form */
            left: calc(50% - 240px); /* Start at the center */
            transform: translateX(-50%); /* Adjust to center horizontally */
            width: 80px;
            z-index: 1;
          }
        `}
      </style>

      {/* Plant Image */}
      <img src={plantImage} alt="Plant" className="plant-image" />

      {/* Person Image */}
      <img src={personImage} alt="Person" className="person-image" />

      {/* Sign In Form */}
      <div className="form-container">
        <h2 className="text-gray-800 text-2xl font-bold mb-6 text-center">
          Welcome Back!
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
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
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mx-auto block"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;