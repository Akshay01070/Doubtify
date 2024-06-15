// src/components/Hero.js
import React, { useState } from 'react';
import { FiX, FiMoreHorizontal, FiLink, FiBookmark, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const AnswerCard = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="bg-gray-100 xl:p-6 p-4 rounded-lg shadow-lg xl:w-[700px] lg:w-[500px] my-4 place-items-center relative">
      <button className="absolute top-2 right-2 text-gray-500">
        <FiX size={20} />
      </button>
      <div className="flex items-center mb-4">
        <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
          <span className="text-gray-500 text-lg">AS</span>
        </div>
        <div>
          <h2 className="text-base font-semibold">Akshay Shinde</h2>
          <div className='flex gap-x-2'> 
            <p className="text-gray-600 text-xs">Second year BTECH CSE Student</p>
          <p className="text-gray-500 text-[11px] font-thin	"> 26 May 2024</p></div>
         
        </div>
      </div>
      <div>
        <h3 className="text-base font-extralight	 mb-2">Learn Fundamentals: Study basic programming concepts and the theoretical aspects of data structures like arrays, linked lists, stacks, queues, trees, graphs, and hash tables.

Use Quality Resources: Read books like "Introduction to Algorithms" and take online courses on platforms like Coursera and edX</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <button className="flex items-center text-green-600 px-4 py-2 bg-green-100 rounded-lg mr-4 ">
              <FiArrowUp className="mr-1" /> 59
            </button>
            <button className="flex items-center text-red-600 px-4 py-2 bg-red-100 rounded-lg mr-4">
              <FiArrowDown className="mr-1" /> 59
            </button>
          </div>
          <div className="relative">
            <button onClick={handleMoreClick} className="text-gray-500">
              <FiMoreHorizontal size={20} />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 ">
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
  );
};

export default AnswerCard;
