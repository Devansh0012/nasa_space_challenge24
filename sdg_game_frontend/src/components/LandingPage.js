import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Redirect to Module 1 (SDG Info)
    navigate('/sdg-info');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-200 to-blue-100 overflow-hidden">
      {/* Fullscreen background image */}
      <img
        src="/images/girlPoint.jpg" // Path to the girl image in the public folder
        alt="Girl pointing to whiteboard"
        className="absolute inset-0 w-full h-100 object-cover z-0" // Keep it to cover the entire screen
      />

      {/* Video Box positioned on the whiteboard */}
      <motion.div
        className="absolute w-full max-w-md h-auto z-10"
        style={{ top: '30%', left: '15%', transform: 'translate(-50%, -50%)' }} // Centered on the whiteboard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.3 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <video
          src="/videos/animatedVideo.mp4" // Path to the video in the public folder
          className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
          autoPlay
          loop
          muted
        />
      </motion.div>

      {/* Ready to Learn More button */}
      <div className="absolute bottom-10 z-10 flex justify-center w-full">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          Ready to Learn More
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
