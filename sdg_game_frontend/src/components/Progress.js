// src/components/Progress.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Progress = () => {
  const [progress, setProgress] = useState({
    level_completed: 0,
    score: 0,
    badges_earned: 0,
    last_updated: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/progress/');
        setProgress(response.data);
      } catch (err) {
        setError('Failed to load progress');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgress();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="progress-container p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <div className="progress-info">
        <p><strong>Level Completed:</strong> {progress.level_completed}</p>
        <p><strong>Score:</strong> {progress.score}</p>
        <p><strong>Badges Earned:</strong> {progress.badges_earned}</p>
        <p><strong>Last Updated:</strong> {new Date(progress.last_updated).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Progress;
