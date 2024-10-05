import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const sdgDetails = [
  {
    title: "No Poverty",
    description: "Learn about SDG 1: Eradicating poverty in all its forms...",
    quizQuestion: "What percentage of the world still lives in poverty?",
    quizOptions: ["5%", "10%", "15%", "20%"],
    correctAnswer: 1
  },
  {
    title: "Zero Hunger",
    description: "Learn about SDG 2: Ending hunger and promoting food security...",
    quizQuestion: "Which region has the highest percentage of undernourishment?",
    quizOptions: ["Asia", "Africa", "Latin America", "Europe"],
    correctAnswer: 1
  },
  // Add more SDGs here
];

const Module2 = ({ onComplete }) => {

    const navigate = useNavigate();

    const handleCompleteModule2 = () => {
    // Mark the module as complete
        onComplete();

    // Redirect to Module 3
        navigate('/module3');
    };

    const [flippedCardIndex, setFlippedCardIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

  const handleCardClick = (index) => {
    setFlippedCardIndex(index === flippedCardIndex ? null : index);
  };

  const handleMemoryGameClick = () => {
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal when clicked outside or on close button
  };

  const [currentSDGIndex, setCurrentSDGIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const handleNextSDG = () => {
    if (currentSDGIndex < sdgDetails.length - 1) {
      setCurrentSDGIndex(currentSDGIndex + 1);
      setSelectedOption(null);
      setQuizResult(null);
    } else {
      onComplete();
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmitQuiz = () => {
    const isCorrect = selectedOption === sdgDetails[currentSDGIndex].correctAnswer;
    setQuizResult(isCorrect ? "Correct!" : "Incorrect, try again.");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{sdgDetails[currentSDGIndex].title}</h2>
      <p>{sdgDetails[currentSDGIndex].description}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">{sdgDetails[currentSDGIndex].quizQuestion}</h3>
        <div className="mt-2">
          {sdgDetails[currentSDGIndex].quizOptions.map((option, index) => (
            <div
              key={index}
              className={`p-3 mt-2 rounded-lg cursor-pointer ${
                selectedOption === index ? 'bg-blue-400' : 'bg-gray-200'
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmitQuiz}
          className="mt-4 p-2 bg-green-500 text-white rounded-lg"
          disabled={selectedOption === null}
        >
          Submit
        </button>

        {quizResult && <p className="mt-4">{quizResult}</p>}
      </div>

      {quizResult && (
        <button
        className="complete-button bg-green-500 text-white p-4 rounded-lg"
        onClick={handleCompleteModule2}
      >
        Complete Module 2
      </button>
      )}
      {/* Memory Game Section */}
      <div className="mt-8 text-center">
        {/* Button to toggle the memory game */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMemoryGameClick}
          className="bg-blue-500 text-white p-4 rounded-lg"
        >
          Let's test your learnings
        </motion.button>
      </div>

      {/* Modal to display Memory Game */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Crosswords"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="p-4">
          <button className="close-button text-red-500" onClick={closeModal}>
            Close
          </button>
          <h3 className="text-xl font-semibold mb-4">Crosswords: Test Your SDG Knowledge</h3>
          <iframe
            src="/SearchWord/wordsearch.html" // Path to the memory game
            width="100%"
            height="600"
            style={{ border: 'none' }}
            title="Crosswords"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Module2;
