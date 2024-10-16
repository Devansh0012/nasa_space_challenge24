import React from "react";

const VideoContent = () => {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* SWOT Analysis Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[90%] mb-4">
        {/* Second Box (Strengths) */}
        <div className="bg-[#B4E1B4] text-black rounded-lg p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-bold text-center">What You’ll Learn</h3>
          <ul className="mt-2 text-left">
            <li>🌱 Understanding the 17 UN SDGs</li>
            <li>🔍 How to take action in your community</li>
            <li>🎮 Fun games and quizzes to test your knowledge</li>
          </ul>
        </div>
        {/* Third Box (Weaknesses) */}
        <div className="bg-[#B4E1B4] text-black rounded-lg p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-bold text-center">Why It Matters</h3>
          <ul className="mt-2 text-left">
            <li>🌍 Protect our planet for future generations</li>
            <li>🤝 Empower your peers and community</li>
            <li>🌟 Be part of a global movement for change</li>
          </ul>
        </div>
        {/* Fourth Box (Opportunities) */}
        <div className="bg-[#B4E1B4] text-black rounded-lg p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-bold text-center">
            Your Role as a Changemaker
          </h3>
          <ul className="mt-2 text-left">
            <li>🌱 Advocate for sustainable practices</li>
            <li>🔧 Participate in community projects</li>
            <li>💡 Share your knowledge with friends and family</li>
          </ul>
        </div>
        {/* Fifth Box (Get Involved) */}
        <div className="bg-[#B4E1B4] text-black rounded-lg p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-bold text-center">Get Involved!</h3>
          <p className="mt-2 text-center">
            Join us in making a difference! Here's how:
          </p>
          <ul
            className="mt-2 list-inside text-left"
            style={{ listStyleType: "none" }}
          >
            {/* Added inline style to remove bullets */}
            <li>🎉 Participate in activities</li>
            <li>📚 Learn about sustainability</li>
            <li>📣 Spread the word!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;