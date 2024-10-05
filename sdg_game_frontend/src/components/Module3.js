import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sdgGroups = [
  { title: "No Poverty & Zero Hunger" },
  { title: "Good Health & Quality Education" },
  { title: "Gender Equality & Clean Water" },
  { title: "Affordable Energy & Economic Growth" },
  { title: "Climate Action & Life Below Water" },
  // Add more groups here
];

const Module3 = ({ onComplete }) => {

    const navigate = useNavigate();

  const handleCompleteModule3 = () => {
    // Mark the module as complete
    onComplete();

    // Redirect to the Badges page
    navigate('/badges');
  };

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [taskComplete, setTaskComplete] = useState(false);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleCompleteTask = () => {
    setTaskComplete(true);
    onComplete();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Contribute to SDGs</h2>

      {!selectedGroup ? (
        <div>
          <p>Select an SDG group to contribute:</p>
          <div className="grid grid-cols-2 gap-6 mt-4">
            {sdgGroups.map((group, index) => (
              <div
                key={index}
                onClick={() => handleGroupSelect(group.title)}
                className="p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
              >
                {group.title}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>You selected: {selectedGroup}</h3>
          <p>Complete the assigned task to contribute!</p>
          <button
        className="complete-button bg-green-500 text-white p-4 rounded-lg"
        onClick={handleCompleteModule3}
      >
        Complete Module 3
      </button>

          {taskComplete && (
            <div className="mt-4">
              <p>Task completed! You have earned a badge!</p>
              {/* Auto-generated certificate can be handled by backend */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Module3;
