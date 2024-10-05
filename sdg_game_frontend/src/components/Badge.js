import React from 'react';

const Badge = ({ progress }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
      <div className="flex space-x-4">
        <div className={`badge ${progress.module1 ? 'bg-green-500' : 'bg-gray-300'}`}>
          Module 1 Badge
        </div>
        <div className={`badge ${progress.module2 ? 'bg-green-500' : 'bg-gray-300'}`}>
          Module 2 Badge
        </div>
        <div className={`badge ${progress.module3 ? 'bg-green-500' : 'bg-gray-300'}`}>
          Module 3 Badge
        </div>
      </div>
    </div>
  );
};

export default Badge;
