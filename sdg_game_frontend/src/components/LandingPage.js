import React from "react";
import VideoSection from "./section1/videoSection";
import NearVideoSection from "./section1/nearVideoContent"; // Import your VideoSection
import ModulesSection from "./moduleSection";
import { motion } from "framer-motion";
import Footer from "./Footer"; // Import framer-motion

const LandingPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col pt-24"
      style={{ backgroundColor: "#EAE8E3" }}
      initial={{ opacity: 0 }} // Animation
      animate={{ opacity: 1 }} // Animation
      transition={{ duration: 0.5 }} // Animation duration
    >
      <h1 className="text-4xl font-bold text-center text-blue-700 mt-5 mb-2">
        Shape a Sustainable Tomorrow – Learn & Lead
      </h1>
      <h2 className="text-xl text-center text-gray-700 mb-8">
        Discover your role in transforming our planet for the better!
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-start w-full px-4 flex-grow">
        <div className="w-full md:w-1/2 flex justify-center md:pr-4 flex-grow">
          <div className="w-full flex justify-center items-center h-full mt-6">
            <VideoSection />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:pl-4 flex-grow">
          <div className="w-full max-w-4xl h-full mt-10">
            <NearVideoSection />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#EAE8E3", padding: "2rem" }}>
        <ModulesSection />
        {/* Added margin-top for space between sections */}
        <div className="flex justify-center mt-8">
          <button className="bg-gradient-to-r from-[#20b020] to-[#1d9e1d] text-white font-semibold text-lg px-6 py-3 rounded shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
            Join The Movement
          </button>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default LandingPage;