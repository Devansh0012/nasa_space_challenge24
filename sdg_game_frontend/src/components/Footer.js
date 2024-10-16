import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        {" "}
        {/* Main centered div */}
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Sustain Academy. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4 mb-2">
          {" "}
          {/* Keep this flex for alignment */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex text-sm space-x-2">
          {" "}
          {/* Keep this flex for alignment */}
          <a href="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms-of-service" className="hover:text-gray-400">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;