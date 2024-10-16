import React, { useState, useEffect } from "react";
import { FaStar, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const calculateTimeRemaining = (endDate) => {
  const now = new Date();
  const distance = endDate - now;

  const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  return { years, days, hours, minutes };
};

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    school: "Green Valley High School",
  });

  const [progress, setProgress] = useState(66);
  const [yearsRemaining, setYearsRemaining] = useState(7);

  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const deadline = new Date("2031-01-01T00:00:00");

  useEffect(() => {
    setTimeout(() => {
      setUserInfo({
        name: "Jane Doe",
        email: "jane.doe@example.com",
        school: "Eco Warriors Academy",
      });
      setProgress(66);
      setYearsRemaining(7);
    }, 1000);

    const countdownInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(deadline));
    }, 60000);

    return () => clearInterval(countdownInterval);
  }, []);

  const renderStars = () => {
    const starCount = Math.floor(progress / 20);
    return (
      <div className="flex space-x-1 justify-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-xl ${index < starCount ? "text-yellow-400" : "text-gray-300"} transition duration-300 transform hover:scale-110`}
          />
        ))}
      </div>
    );
  };

  const renderProgressBar = () => {
    const steps = [20, 40, 60, 80, 100];
    return (
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="relative w-full flex items-center">
            <div
              className={`w-8 h-8 rounded-full ${progress >= step ? "bg-green-500" : "bg-gray-200"} flex items-center justify-center text-white font-bold shadow-lg transition duration-300 transform hover:scale-110`}
            >
              {step === 100 ? <FaCheckCircle /> : step}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-grow h-2 mx-2 rounded-full ${progress >= steps[index + 1] ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSDGAwarenessDoughnut = () => {
    const data = {
      labels: ["Awareness", "Not Aware"], // Add labels for the legend
      datasets: [
        {
          data: [72, 28],
          backgroundColor: ["#4caf50", "#e0e0e0"],
          borderWidth: 0,
        },
      ],
    };

    const options = {
      cutout: "75%",
      plugins: {
        tooltip: { enabled: false },
        legend: {
          display: false, // Disable legend if not needed
        },
      },
    };

    return (
      <div className="relative w-40 h-40">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">72%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 pt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Section */}
        <div className="bg-gradient-to-r from-teal-100 to-green-100 p-6 rounded-lg shadow-md glassmorphism border-l-4 border-teal-500 h-auto">
          <div className="flex flex-col items-center mb-4">
            <FaUserCircle className="text-6xl text-teal-500 mb-2" />
            <h2 className="text-2xl font-bold mb-2 text-teal-700">{userInfo.name}</h2>
            <p className="text-gray-600">{userInfo.email}</p>
            <p className="text-gray-600">{userInfo.school}</p>
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-2 text-teal-700 text-center">Module Progress Rating</h3>
          {renderStars()}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg shadow-md glassmorphism border-l-4 border-indigo-500">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b-2 pb-2 border-indigo-500 inline-block">
              Module Progress
            </h3>
            {renderProgressBar()}
            <p className="mt-4 text-right text-indigo-600 font-semibold">{progress}% completed</p>
          </div>

          {/* SDG Awareness Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-md glassmorphism border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 border-b-2 pb-2 border-blue-500 inline-block">
              Your Impact on the Environment
            </h3>
            <div className="flex flex-col items-center mb-6">
              {renderSDGAwarenessDoughnut()}
              <p className="text-gray-500 text-center mb-2">of people worldwide are aware of the SDGs.</p>
            </div>
            <p className="mt-4 text-lg text-center text-gray-600">
              By completing the modules, you contribute to a healthier planet.
            </p>
          </div>
        </div>

        {/* Countdown Timer Section */}
        <div className="bg-gradient-to-r from-pink-100 to-red-100 p-6 rounded-lg shadow-md glassmorphism border-l-4 border-red-500">
          <h3 className="text-xl font-semibold mb-4 text-red-700 border-b-2 pb-2 border-red-500 inline-block">
            Time Left to Save the Planet
          </h3>
          <div className="flex justify-center text-4xl font-bold text-gray-700 space-x-4">
            <div className="text-red-600">{timeRemaining.years}y</div>
            <div className="text-red-600">{timeRemaining.days}d</div>
            <div className="text-red-600">{timeRemaining.hours}h</div>
            <div className="text-red-600">{timeRemaining.minutes}m</div>
          </div>
          <p className="mt-4 text-lg text-center text-gray-600">
            We have approximately <span className="font-bold">{yearsRemaining} years</span> left to make an impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
