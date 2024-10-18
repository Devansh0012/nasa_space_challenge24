import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../pages/cardImages/logo.png";
import {
  FaSatellite,
  FaUserCircle,
  FaTrophy,
  FaGlobe,
  FaSignOutAlt,
  FaWater,
  FaCloudRain,
  FaInfoCircle,
  FaBars,
} from "react-icons/fa";
//import './Header.css'; // Assuming we import custom styles for fonts

const Header = ({ overallProgress }) => {
  const [menuOpen, setMenuOpen] = useState(false); // For responsive menu on mobile
  const [dropdownOpen, setDropdownOpen] = useState(false); // For handling dropdown
  const isAuthenticated = localStorage.getItem("token"); // Check authentication state
  const navigate = useNavigate(); // For linking to Dashboard

  const handleProgressClick = () => {
    navigate("/dashboard"); // Navigate to Dashboard page
  };

  return (
    <header className="bg-white/30 backdrop-blur-md p-4 shadow-lg fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src= {logo}
            alt="Sustain Academy Logo"
            className="h-10 w-10 mr-2 mt-1"
          />
          <h1 className="text-3xl font-extrabold tracking-wider text-gray-800 font-poppins">
            Sustain Academy
          </h1>
        </div>


        {/* Responsive menu button for mobile */}
        <button
          className="text-gray-800 text-2xl lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        {/* Menu for larger screens */}
        <div
          className={`lg:flex items-center lg:space-x-6 space-y-4 lg:space-y-0 transition-all duration-500 ${
            menuOpen ? "flex flex-col space-y-4" : "hidden lg:flex"
          }`}
        >
          {/* My Progress Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="bg-white/50 backdrop-blur-md text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-full flex items-center space-x-2 transition duration-300 font-medium tracking-wide font-poppins"
              onClick={handleProgressClick}
            >
              <FaTrophy />
              <span>My Progress</span>
            </button>
            {/* Dropdown for larger screens */}
            {dropdownOpen && (
              <div className="absolute z-10 bg-white/70 backdrop-blur-lg text-gray-700 mt-2 rounded-md shadow-lg w-56 p-4 transition-all duration-300 transform -translate-y-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">Progress:</span>
                  <span className="font-bold text-green-600">{overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Keep up the great work!
                </p>
              </div>
            )}
          </div>

          {/* Satellite View Dropdown */}
          <div className="relative group">
            <button className="bg-white/50 backdrop-blur-md text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-full flex items-center space-x-2 transition duration-300 font-medium tracking-wide font-poppins">
              <FaSatellite />
              <span>Satellite View</span>
            </button>
            {/* Dropdown content */}
            <div className="absolute hidden group-hover:block bg-white/70 backdrop-blur-lg text-gray-700 mt-2 rounded-md shadow-lg w-56 p-4 transition-all duration-300 transform -translate-y-2">
              <a
                href="https://eyes.nasa.gov/apps/earth/#/vital-signs/gravity-field-map/water-storage-monthly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-300 transition duration-200 font-poppins"
              >
                <FaWater className="mr-2" />
                Water Storage
              </a>
              <a
                href="https://eyes.nasa.gov/apps/earth/#/satellites/aqua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-300 transition duration-200 font-poppins"
              >
                <FaGlobe className="mr-2" />
                Aqua Satellite
              </a>
              <a
                href="https://gpm.nasa.gov/education/articles/nasa-earth-science-water-cycle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-300 transition duration-200 font-poppins"
              >
                <FaInfoCircle className="mr-2" />
                Info Source
              </a>
              <Link
                to="/rainforcast-map"
                className="flex items-center px-4 py-2 hover:bg-gray-300 transition duration-200 font-poppins"
              >
                <FaCloudRain className="mr-2" />
                Rain Map
              </Link>
            </div>
          </div>

          {/* Authentication buttons */}
          {isAuthenticated ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition duration-300 font-semibold tracking-wide font-poppins"
              onClick={() => {
                localStorage.removeItem("token"); // Clear authentication token
                window.location.reload(); // Reload page to reflect changes
              }}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition duration-300 font-semibold tracking-wide font-poppins"
            >
              <FaUserCircle />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
