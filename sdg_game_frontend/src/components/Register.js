import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import personImage from "../pages/cardImages/person.png";
import plantImage from "../pages/cardImages/flower.png";

// Function to get the CSRF token from cookies
const getCSRFToken = () => {
  let token = null;
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name === "csrftoken") {
      token = value;
    }
  });
  return token;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setErrorMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = {
      username: firstName + lastName,  // Or some concatenation logic
      email: email,
      password1: password,
      password2: password2,
    };
    

    const csrftoken = getCSRFToken(); // Get CSRF token from cookies

    try {
      // Make the POST request to the correct backend URL (Django API running on localhost:8000)
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken, // Include CSRF token in the headers
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text(); // Get the raw response text
      const data = response.ok
        ? JSON.parse(responseText)
        : { message: responseText };

      if (response.ok) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPassword2("");
        navigate("/login/"); // Redirect to login after successful registration
      } else {
        setErrorMessage(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
      {/* Inline CSS Styles */}
      <style>
        {`
          .form-container {
            background-color: #a8edea;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            z-index: 2;
          }

          .input-row {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
          }

          .input-row input {
            width: 100%;
          }

          .form-container input {
              padding: 0.5rem;
              height: auto;
          }

          .person-image {
            position: absolute;
            top: calc(-50px + 180px);
            left: calc(50% + 350px);
            transform: translateX(-50%);
            width: 300px;
            z-index: 1;
          }

          .plant-image {
            position: absolute;
            bottom: calc(-60px + 150px);
            left: calc(50% - 300px);
            transform: translateX(-50%);
            width: 100px;
            z-index: 1;
          }
        `}
      </style>

      {/* Plant and Person Images */}
      <img src={plantImage} alt="Plant" className="plant-image" />
      <img src={personImage} alt="Person" className="person-image" />

      {/* Form */}
      <div className="form-container">
        <h2 className="text-gray-800 text-2xl font-bold mb-6 text-center">
          Sign Up for a Better Tomorrow!
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          {/* First Name and Last Name Row */}
          <div className="input-row mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="p-3 rounded-md border border-gray-300 focus:outline-none"
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="p-3 rounded-md border border-gray-300 focus:outline-none"
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* School Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="schoolName"
            >
              School Name
            </label>
            <input
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none"
              type="text"
              id="schoolName"
              placeholder="School Name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password and Confirm Password Row */}
          <div className="input-row mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="p-3 rounded-md border border-gray-300 focus:outline-none"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password2"
              >
                Confirm Password
              </label>
              <input
                className="p-3 rounded-md border border-gray-300 focus:outline-none"
                type="password"
                id="password2"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mx-auto block">
            SignUp
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;