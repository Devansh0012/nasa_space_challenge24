import React, { useState } from 'react';

const TaskModule = ({ tasks, onCompleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCompleteTask = () => {
    if (selectedTask) {
      alert(`Task Completed: ${selectedTask}`);
      onCompleteTask(selectedTask);
    } else {
      alert('Please select a task first.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Join an SDG Initiative</h2>
      <p className="mb-4">Select a task to complete and earn your badge!</p>
      <select
        className="p-2 border rounded"
        onChange={(e) => setSelectedTask(e.target.value)}
      >
        <option value="">Select a Task</option>
        {tasks.map((task, index) => (
          <option key={index} value={task}>
            {task}
          </option>
        ))}
      </select>
      <button
        onClick={handleCompleteTask}
        className="mt-4 p-2 bg-yellow-500 text-white rounded-lg"
      >
        Complete Task
      </button>
    </div>
  );
};

export default TaskModule;
