import React from 'react';
import { motion } from 'framer-motion';

const SDGCard = ({ sdg, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white p-4 shadow-md rounded-lg hover:bg-blue-100 cursor-pointer transition-all duration-300"
    onClick={onClick}
  >
    <h2 className="text-xl font-semibold text-center">{sdg.title}</h2>
  </motion.div>
);

const SDGModule = ({ sdgs }) => {
  const handleCardClick = (sdg) => {
    alert(`You selected ${sdg.title}! Showing video now...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 gap-4 p-8"
    >
      {sdgs.map((sdg) => (
        <SDGCard key={sdg.id} sdg={sdg} onClick={() => handleCardClick(sdg)} />
      ))}
    </motion.div>
  );
};

export default SDGModule;
