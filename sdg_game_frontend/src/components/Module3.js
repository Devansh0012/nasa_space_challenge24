import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateGenerator from './CertificateGenerator'; // Adjust the path as necessary

const sdgGroups = [
  { title: 'No Poverty & Zero Hunger' },
  { title: 'Good Health & Quality Education' },
  { title: 'Gender Equality & Clean Water' },
  { title: 'Affordable Energy & Economic Growth' },
  { title: 'Climate Action & Life Below Water' },
  // Add more groups here
];

const Module3 = ({ onComplete }) => {
  const navigate = useNavigate();

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [taskComplete, setTaskComplete] = useState(false);
  const [certificateIssued, setCertificateIssued] = useState(false);

  const handleGroupSelect = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(selectedGroups.filter((g) => g !== group));
    } else if (selectedGroups.length < 2) {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  const handleTaskCompletion = () => {
    setTaskComplete(true);
    onComplete();
  };

  const handleCertificateSubmission = () => {
    setCertificateIssued(true);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Module 3 - Contribute to SDGs</h2>

      {!taskComplete ? (
        <div>
          <p>Select at least 2 SDG groups to contribute:</p>
          <div className="grid grid-cols-2 gap-6 mt-4">
            {sdgGroups.map((group, index) => (
              <div
                key={index}
                onClick={() => handleGroupSelect(group.title)}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedGroups.includes(group.title)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                } hover:bg-gray-300`}
              >
                {group.title}
              </div>
            ))}
          </div>

          {selectedGroups.length >= 2 && (
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white p-4 rounded-lg"
                onClick={handleTaskCompletion}
              >
                Complete Task for Module 3
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">Task Completed!</h3>
          <p className="mt-2">Upload your proof (with geotagging) of task completion:</p>
          <button
            className="bg-green-500 text-white p-4 rounded-lg mt-2"
            onClick={() => alert('Your proof with geotag has been uploaded.')}
          >
            Upload Proof
          </button>

          {!certificateIssued ? (
            <div className="mt-4">
              {/* Include CertificateGenerator here */}
              <CertificateGenerator studentName="John Doe" />
            </div>
          ) : (
            <div className="mt-4">
              <p>Certificate issued! You can now share your badge on social media:</p>
              <button
                className="bg-purple-500 text-white p-4 rounded-lg mt-2"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(
                    'I completed Module 3 of the SDG challenge and earned a Gold Badge!'
                  );
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                  window.open(twitterUrl, '_blank');
                }}
              >
                Share on Social Media
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Module3;
