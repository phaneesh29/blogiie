import React from "react";
import { FaHome, FaUserPlus, FaSignInAlt, FaBullhorn, FaClipboardList } from "react-icons/fa";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="text-white min-h-screen flex flex-col">

      {/* Header */}
      <header className="text-center py-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-teal-400">
          Welcome to My Blog App
        </h1>
        <p className="mt-4 text-gray-300 text-lg">
          Explore. Share. Connect. Your space for inspiring blogs!
        </p>
      </header>

      {/* Navigation Buttons */}
      <div className="mt-10 flex space-x-6 justify-center flex-wrap gap-3">
        <a
          href="/home"
          className="flex items-center justify-center px-6 py-3 text-lg font-semibold bg-teal-500 hover:bg-teal-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaHome className="mr-2 text-2xl" />
          Home
        </a>

        <a
          href="/register"
          className="flex items-center justify-center px-6 py-3 text-lg font-semibold bg-purple-500 hover:bg-purple-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaUserPlus className="mr-2 text-2xl" />
          Register
        </a>

        <a
          href="/login"
          className="flex items-center justify-center px-6 py-3 text-lg font-semibold bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaSignInAlt className="mr-2 text-2xl" />
          Login
        </a>
      </div>

      {/* Features Section */}
      <section className="mt-20 text-center px-6">
        <h2 className="text-3xl font-semibold text-teal-400">Why Choose Us?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaBullhorn className="text-4xl text-teal-500 inline" />
            <h3 className="mt-4 text-xl font-semibold">Engaging Content</h3>
            <p className="text-gray-300 mt-2">
              Read and share content that inspires you, with a platform designed for creators.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaClipboardList className="text-4xl text-teal-500 inline" />
            <h3 className="mt-4 text-xl font-semibold">Easy Navigation</h3>
            <p className="text-gray-300 mt-2">
              Effortlessly browse through blogs and articles with simple, intuitive navigation.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaBullhorn className="text-4xl text-teal-500 inline" />
            <h3 className="mt-4 text-xl font-semibold">Collaborate and Share</h3>
            <p className="text-gray-300 mt-2">
              Connect with other creators, comment, and engage with content from all over the world.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-20 bg-gray-800 py-12 text-center">
        <h2 className="text-3xl font-semibold text-teal-400">What Our Users Say</h2>
        <div className="mt-6 flex flex-wrap justify-center">
          <div className="bg-gray-700 p-6 m-4 rounded-lg shadow-xl w-80">
            <p className="text-gray-300 italic">
              "This platform has helped me share my stories with the world! I love the community!"
            </p>
            <div className="mt-4 text-teal-400 font-semibold">Atta Dough</div>
          </div>
          <div className="bg-gray-700 p-6 m-4 rounded-lg shadow-xl w-80">
            <p className="text-gray-300 italic">
              "A great place to learn, collaborate, and grow as a creator. Highly recommend!"
            </p>
            <div className="mt-4 text-teal-400 font-semibold">Iron Smith</div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-20 text-center bg-teal-500 py-12">
        <h2 className="text-4xl text-white font-semibold">
          Ready to Start Sharing?
        </h2>
        <p className="text-lg text-white mt-4">
          Join our community of creators today. Share your passion with the world!
        </p>
        <a
          href="/register"
          className="mt-8 inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LandingPage;
