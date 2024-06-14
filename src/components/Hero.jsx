// src/components/Hero.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiMoreHorizontal, FiLink, FiBookmark, FiArrowUp } from 'react-icons/fi';
import AnswerPopup from './AnswerPopup';

const Hero = ({ stopOnClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const navigate = useNavigate();

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  const handleAnswerClick = (e) => {
    e.stopPropagation();
    setShowAnswerPopup(true);
  };

  const closeAnswerPopup = () => {
    setShowAnswerPopup(false);
  };

  const handleComponentClick = (e) => {
    if (stopOnClick) {
      return;
    }
    e.stopPropagation();
    navigate('Answer'); // Update this path to match your route
  };

  return (
    <div className=" bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg w-[750px] max-w-[750px] mx-auto my-4 place-items-center relative">
      <button className="absolute top-2 right-2 text-gray-500">
        <FiX size={20} />
      </button>
      <div onClick={handleComponentClick} className="cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
            <span className="text-gray-500 text-lg">AS</span>
          </div>
          <div>
            <h2 className="text-base font-semibold">Akshay Shinde</h2>
            <div className="flex gap-x-2">
              <p className="text-gray-600 text-xs">Second year BTECH CSE Student</p>
              <p className="text-gray-500 text-[11px] font-thin">26 May 2024</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium mb-2">How can I learn data structures efficiently?</h3>
          <p className="text-gray-500 text-[11px] font-normal mb-1 ml-2">2 Answers</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <button
                onClick={handleAnswerClick}
                className="text-blue-500 mr-4 px-4 py-2 bg-blue-100 rounded-lg"
              >
                Answer
              </button>
              <button
                className="flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4"
                onClick={(e) => e.stopPropagation()} // Prevent navigation on Upvote button click
              >
                <FiArrowUp className="mr-1" /> 59
              </button>
            </div>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoreClick();
                }}
                className="text-gray-500"
              >
                <FiMoreHorizontal size={20} />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <FiLink className="mr-2" /> Copy Link
                  </button>
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <FiBookmark className="mr-2" /> Bookmark
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAnswerPopup && <AnswerPopup onClose={closeAnswerPopup} />}
    </div>
  );
};

export default Hero;
