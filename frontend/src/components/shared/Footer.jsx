import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto text-center">
          <p>&copy; Worknest. All rights reserved.</p>
          <p>Follow us on:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://www.facebook.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://www.twitter.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://www.linkedin.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 text-white py-2 text-center">
        <p>Powered by Worknest, 2025</p>
      </div>
    </div>
  );
};

export default Footer;
