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
    <div className="relative flex items-center justify-center h-screen w-screen bg-blue-100">
      {/* Fullscreen background image */}
      <img
        src="/images/girlPoint.jpg" // Path to the girl image in the public folder
        alt="Girl pointing to whiteboard"
        className="relative inset-0 w-[70%] h-[80%] object-cover z-0"
      />

      {/* Video Box positioned on top of the whiteboard */}
      <motion.div
        className="absolute w-[500px] h-[300px] z-10"
        style={{ top: '5%', left: '15%' }} // Adjusted the top percentage to move video lower
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <video
          src="/videos/animatedVideo.mp4" // Path to the video in the public folder
          width="100%"
          height="100%"
          autoPlay
          loop
          unmuted
          className="rounded-lg"
        />
      </motion.div>

      {/* Ready to Learn More button */}
      <div className="absolute bottom-10 z-10 flex space-x-4">
        <button
          className="submit-button bg-blue-500 text-white p-4 rounded-lg"
          onClick={handleSubmit}
        >
          Ready to Learn More
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
