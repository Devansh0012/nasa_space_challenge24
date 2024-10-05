import React, { useState, useEffect } from 'react';
import SDGModule from '../components/SDGModule';
import QuizModule from '../components/QuizModule';

const SDGPage = () => {
  const [sdgs, setSDGs] = useState([
    { id: 1, title: 'No Poverty' },
    { id: 2, title: 'Zero Hunger' },
    { id: 3, title: 'Good Health & Well-Being' },
    // Add more SDGs
  ]);

  const [quizData, setQuizData] = useState([
    {
      id: 1,
      question: 'What is poverty?',
      options: ['Lack of money', 'Hunger', 'Both'],
    },
    // Add more quiz questions
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Learn About SDGs</h1>
      <SDGModule sdgs={sdgs} />
      <QuizModule quizData={quizData} />
    </div>
  );
};

export default SDGPage;
