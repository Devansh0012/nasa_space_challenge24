import React, { useState } from 'react';

const QuizModule = ({ quizData }) => {
  const [answers, setAnswers] = useState({});
  const handleSubmit = () => {
    alert('Quiz Submitted! Your answers: ' + JSON.stringify(answers));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">SDG Knowledge Quiz</h2>
      {quizData.map((q) => (
        <div key={q.id} className="mb-4">
          <p className="mb-2">{q.question}</p>
          {q.options.map((option, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option}
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-green-500 text-white rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default QuizModule;
