import React, { useState } from 'react';
import Modal from 'react-modal';

// Custom styling for Modal (optional)
Modal.setAppElement('#root'); // Important for accessibility

const Puzzle = () => {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const openGameModal = () => {
    setIsGameModalOpen(true);
  };

  const closeGameModal = () => {
    setIsGameModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to the Puzzle Game!</h1>
      <p className="text-lg text-white mb-6">Test Your SDG Knowledge and have fun!</p>
      <button
        onClick={openGameModal}
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition duration-200 transform hover:scale-105"
      >
        Start Playing
      </button>

      {/* Modal to display Puzzle Game */}
      <Modal
        isOpen={isGameModalOpen}
        onRequestClose={closeGameModal}
        contentLabel="Puzzle Game"
        className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button className="self-end text-red-500 font-bold text-lg mb-4" onClick={closeGameModal}>
          &times; Close
        </button>
        <h3 className="text-2xl font-semibold mb-4">Puzzle Game: Test Your SDG Knowledge</h3>
        <iframe
          src="/Puzzle Game/index.html" // Path to the puzzle game in the public folder
          width="700"
          height="400"
          className="border-0 rounded-lg shadow-lg"
          title="Puzzle Game"
        />
      </Modal>
    </div>
  );
};

export default Puzzle;
