import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Progress from "./Progress";
import {
  FaSatellite,
  FaUserCircle,
  FaTrophy,
  FaGlobe,
  FaSignOutAlt,
  FaWater,
  FaCloudRain,
  FaInfoCircle,
} from "react-icons/fa";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  // Check if the user is authenticated (runs when the component mounts)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication state based on token existence
  }, [setIsAuthenticated]);

  // Handle logout and remove token
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update authentication state
    window.location.reload(); // Optional: Reload page to reflect changes, or use state to rerender components
  };

  return (
    <header className="bg-gradient-to-r from-[#3a6351] to-[#d5c6a8] p-4 text-white shadow-md fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            🌍 Sustain Academy
          </h1>
        </div>

        <div className="flex space-x-4 md:space-x-6 items-center">
          {/* My Progress Dropdown */}
          <div className="relative group">
            <button className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-full flex items-center space-x-2 transition duration-200">
              <FaTrophy />
              <span>My Progress</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-md shadow-lg w-40 p-2 transition duration-200 transform -translate-y-2">
              <Progress />
            </div>
          </div>

          {/* Satellite View Dropdown */}
          <div className="relative group">
            <button className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-full flex items-center space-x-2 transition duration-200">
              <FaSatellite />
              <span>Satellite View</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-md shadow-lg w-40 p-2 transition duration-200 transform -translate-y-2">
              {/* Satellite Links with Icons */}
              <a
                href="https://eyes.nasa.gov/apps/earth/#/vital-signs/gravity-field-map/water-storage-monthly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-200 transition duration-200 no-underline"
              >
                <FaWater className="mr-2" />
                Water Storage
              </a>
              <a
                href="https://eyes.nasa.gov/apps/earth/#/satellites/aqua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-200 transition duration-200 no-underline"
              >
                <FaGlobe className="mr-2" />
                Aqua Satellite
              </a>
              <a
                href="https://gpm.nasa.gov/education/articles/nasa-earth-science-water-cycle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-200 transition duration-200 no-underline"
              >
                <FaInfoCircle className="mr-2" />
                Info Source
              </a>
              <Link
                to="/rainforcast-map"
                className="flex items-center px-4 py-2 hover:bg-gray-200 transition duration-200 no-underline"
              >
                <FaCloudRain className="mr-2" />
                Rain Map
              </Link>
            </div>
          </div>

          {/* Conditional Profile/Sign-In Dropdown */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-full transition duration-200">
                <FaUserCircle />
                <span>Profile</span>
              </button>
              <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-md shadow-lg w-40 p-2 transition duration-200 transform -translate-y-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  My Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition duration-200"
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