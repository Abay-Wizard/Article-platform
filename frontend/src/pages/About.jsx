import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-15 bg-gray-50 flex flex-col items-center px-4 md:px-12 py-22">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-10">
        {/* Left Logo */}
        <div className="flex-1 flex justify-center">
          <h1
            className="text-4xl md:text-5xl font-bold cursor-pointer text-purple-700 hover:text-purple-600 transition"
            onClick={() => navigate("/")}
          >
            Article<span className="text-purple-200">Hub</span>
          </h1>
        </div>

        {/* Right Text */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700">
            About Our Platform
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Welcome to ArticleHub! Our platform connects you with like-minded
            individuals across the globe. Share your ideas, post articles, and
            collaborate with a community of learners and professionals.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            We believe in fostering meaningful connections, encouraging
            creativity, and providing a safe space for knowledge-sharing. Join
            our platform to explore, engage, and grow together.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/articles")}
              className="bg-white border border-purple-600 text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
