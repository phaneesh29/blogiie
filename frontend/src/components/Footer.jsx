import React from 'react';
import { Link } from 'react-router-dom'; // For navigation to legal pages

const Footer = () => {
  const date = new Date
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {date.getFullYear} My Blogie. All rights reserved.</p>
        <div className="mt-4">
          <Link to="/privacy-policy" className="mx-4 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="mx-4 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
