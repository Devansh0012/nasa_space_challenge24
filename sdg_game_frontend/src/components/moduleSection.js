import React from "react";
import { Link } from "react-router-dom";
import module1 from "../pages/cardImages/module1.jpg";
import module2 from "../pages/cardImages/module2.avif";
import module3 from "../pages/cardImages/module3.png";
import { FaBookOpen, FaLeaf, FaGlobe } from "react-icons/fa"; // Example icons
import { Tooltip } from "react-tooltip"; // Named import for tooltip
import { motion } from "framer-motion";

const ModulesSection = () => {
  return (
    <div className="w-full py-12" style={{ backgroundColor: "#E8F5E9" }}>
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Uncover the Secrets of Sustainability
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[90%] mx-auto">
        {/* Module 1 */}
        <motion.div
          className="bg-gray-100 rounded-lg p-4 shadow-lg transition duration-100 transform hover:scale-105" // Reduced hover transition duration
          initial={{ opacity: 0, y: 20 }} // Initial state for animation
          animate={{ opacity: 1, y: 0 }} // Animation when component mounts
          transition={{ duration: 0.3 }} // Shortened duration of animation
          whileHover={{ scale: 1.05 }} // Add hover scale animation
        >
          <img
            src={module1}
            alt="Module 1"
            className="w-full h-60 object-cover rounded-md" // Adjusted height
          />
          <h3
            className="text-xl font-bold text-center mt-4"
            data-tip="Click for details"
          >
            <FaBookOpen className="inline mr-2" /> Module 1
          </h3>
          <Tooltip place="top" effect="solid" />
          <p className="text-center mt-2">Description for Module 1.</p>
          <div className="flex justify-center mt-4">
          <Link to="/sdg-info">
              <button className="bg-blue-700 text-white py-2 px-4 rounded-md">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Module 2 */}
        <motion.div
          className="bg-gray-100 rounded-lg p-4 shadow-lg transition duration-100 transform hover:scale-105" // Reduced hover transition duration
          initial={{ opacity: 0, y: 20 }} // Initial state for animation
          animate={{ opacity: 1, y: 0 }} // Animation when component mounts
          transition={{ duration: 0.3 }} // Shortened duration of animation
          whileHover={{ scale: 1.05 }} // Add hover scale animation
        >
          <img
            src={module2}
            alt="Module 2"
            className="w-full h-60 object-cover rounded-md" // Adjusted height
          />
          <h3
            className="text-xl font-bold text-center mt-4"
            data-tip="Click for details"
          >
            <FaLeaf className="inline mr-2" /> Module 2
          </h3>
          <Tooltip place="top" effect="solid" />
          <p className="text-center mt-2">Description for Module 2.</p>
          <div className="flex justify-center mt-4">
          <Link to="/module2">
              <button className="bg-blue-700 text-white py-2 px-4 rounded-md">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Module 3 */}
        <motion.div
          className="bg-gray-100 rounded-lg p-4 shadow-lg transition duration-100 transform hover:scale-105" // Reduced hover transition duration
          initial={{ opacity: 0, y: 20 }} // Initial state for animation
          animate={{ opacity: 1, y: 0 }} // Animation when component mounts
          transition={{ duration: 0.3 }} // Shortened duration of animation
          whileHover={{ scale: 1.05 }} // Add hover scale animation
        >
          <img
            src={module3}
            alt="Module 3"
            className="w-full h-60 object-cover rounded-md" // Adjusted height
          />
          <h3
            className="text-xl font-bold text-center mt-4"
            data-tip="Click for details"
          >
            <FaGlobe className="inline mr-2" /> Module 3
          </h3>
          <Tooltip place="top" effect="solid" />
          <p className="text-center mt-2">Description for Module 3.</p>
          <div className="flex justify-center mt-4">
          <Link to="/module3">
              <button className="bg-blue-700 text-white py-2 px-4 rounded-md">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModulesSection;