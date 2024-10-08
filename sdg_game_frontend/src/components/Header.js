// /sdg_game_frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Progress from './Progress';

const Header = () => {
  const isAuthenticated = localStorage.getItem('token');  // Check authentication state

  return (
    <header className="bg-blue-600 p-0.5 text-white shadow-md fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SDG Interactive Learning Game</h1>
        </div>
        
        <div className="flex space-x-4 md:space-x-6 items-center">
          <div className="relative group">
            <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md">
              My Progress
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-md shadow-lg w-64 p-4">
              <Progress /> {/* Display the Progress component here */}
            </div>
          </div>
          {/* Satellite View Dropdown */}
          <div className="relative group">
            <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md">
              Satellite View
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-md shadow-lg w-48 z-50">
              <a href="https://eyes.nasa.gov/apps/earth/#/vital-signs/gravity-field-map/water-storage-monthly" target='_blank' rel="noopener noreferrer" className="block px-4 py-2 hover:bg-gray-200">
                Water Storage Satellite View
              </a>
              <a href="https://eyes.nasa.gov/apps/earth/#/satellites/aqua" target='_blank' rel="noopener noreferrer" className="block px-4 py-2 hover:bg-gray-200">
                Aqua Earth Satellite
              </a>
              <a href="https://gpm.nasa.gov/education/articles/nasa-earth-science-water-cycle" target='_blank' rel="noopener noreferrer" className="block px-4 py-2 hover:bg-gray-200">
                Source Info
              </a>
              <Link to="/rainforcast-map" className="block px-4 py-2 hover:bg-gray-200">
                Rain Forecast Map
              </Link>
            </div>
          </div>

          {/* Conditionally render login/logout based on auth status */}
          {isAuthenticated ? (
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
              onClick={() => {
                localStorage.removeItem('token');  // Clear authentication token
                window.location.reload();  // Reload page to reflect changes
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
