import React from 'react';

// Simple function to share on social media
const shareOnSocialMedia = (badge) => {
  const url = encodeURIComponent(window.location.href); // Current page URL
  const text = encodeURIComponent(`I just earned the ${badge} badge! 🎉`); // Share text
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  window.open(twitterUrl, '_blank');
};

const Badge = ({ progress }) => {
  // Logging the progress to check if modules are true
  console.log("Progress: ", progress);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
      <div className="flex space-x-4">
        {progress.module1 && (
          <div 
            className="badge badge-bronze animate-pulse cursor-pointer" 
            onClick={() => shareOnSocialMedia('Bronze')}
          >
            Bronze Badge
          </div>
        )}
        {(
          <div 
            className="badge badge-silver animate-pulse cursor-pointer" 
            onClick={() => shareOnSocialMedia('Silver')}
          >
            Silver Badge
          </div>
        )}
        {progress.module3 && (
          <div 
            className="badge badge-gold animate-pulse cursor-pointer" 
            onClick={() => shareOnSocialMedia('Gold')}
          >
            Gold Badge
          </div>
        )}
      </div>
      <style jsx>{`
        .badge {
          padding: 1rem 2rem;
          border-radius: 9999px;
          color: white;
          font-weight: bold;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .badge:hover {
          transform: scale(1.1);
        }

        .badge-bronze {
          background-color: #cd7f32; /* Bronze color */
        }

        .badge-silver {
          background-color: #c1c1c1; /* Silver color */
        }

        .badge-gold {
          background-color: #ffd700; /* Gold color */
        }

        .animate-pulse {
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Badge;
