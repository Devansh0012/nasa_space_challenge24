import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import poverty from '../assets/videos/Social Equity and Well Being.mp4';
import health from '../assets/videos/Governance and Ecosystems.mp4';
import growth from '../assets/videos/Economic Growth and Infrastructure.mp4';
import climate from '../assets/videos/Environmental Sustainability.mp4';

const sdgGroups = [
  { title: "No Poverty & Zero Hunger", videoUrl: poverty },
  { title: "Good Health & Quality Education", videoUrl: health },
  { title: "Affordable Energy & Economic Growth", videoUrl: growth },
  { title: "Climate Action & Life Below Water", videoUrl: climate },
];

const Module1 = ({ onComplete }) => {
  const navigate = useNavigate();

  const handleCompleteModule1 = () => {
    onComplete();
    navigate('/module2');
  };

  const [flippedCardIndex, setFlippedCardIndex] = useState(null);
  const [showMemoryGame, setShowMemoryGame] = useState(false); // Toggle for showing memory game

  const handleCardClick = (index) => {
    setFlippedCardIndex(index === flippedCardIndex ? null : index);
  };

  const handleMemoryGameClick = () => {
    setShowMemoryGame(true); // Show the memory game when button is clicked
  };

  if (showMemoryGame) {
    // If memory game is clicked, show the game
    return (
      <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
        <div className="p-6 bg-white rounded-lg shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
            onClick={() => setShowMemoryGame(false)} // Go back to the main module when clicked
          >
            Close Memory Game
          </button>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Memory Game: Test Your SDG Knowledge
          </h3>
          <iframe
            src="/MemoryGame/index.html" // Path to the memory game
            width="100%"
            height="600"
            style={{ border: 'none' }}
            title="Memory Game"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
        Learn About the SDGs
      </h2>

      {/* SDG Learning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sdgGroups.map((group, index) => (
          <motion.div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`relative w-full h-72 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 ${
              flippedCardIndex === index ? 'rotate-y-180' : ''
            }`}
            style={{ perspective: '1000px' }}
          >
            {/* Front of the card */}
            <motion.div
              className={`absolute inset-0 flex flex-col justify-center items-center p-6 ${
                flippedCardIndex === index ? 'hidden' : 'block'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {group.title}
              </h3>
              <p className="text-sm text-gray-500">Click to learn more!</p>
            </motion.div>

            {/* Back of the card (Video) */}
            <motion.div
              className={`absolute inset-0 bg-blue-50 p-4 rounded-lg ${
                flippedCardIndex === index ? 'block' : 'hidden'
              }`}
            >
              <video className="w-full h-full rounded-lg shadow-md" controls>
                <source src={group.videoUrl} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Complete Button */}
      {flippedCardIndex !== null && (
        <div className="text-center mt-12">
          <button
            className="complete-button bg-green-600 hover:bg-green-700 text-white text-lg py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out"
            onClick={handleCompleteModule1}
          >
            Complete Module 1
          </button>
        </div>
      )}

      {/* Memory Game Section */}
      <div className="mt-16 text-center">
        {/* Button to toggle the memory game */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMemoryGameClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Let's Test Your Learnings
        </motion.button>
      </div>
    </div>
  );
};

export default Module1;
