// src/components/Questions.js
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';

const Questions = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
  };

  return (
    <div className="p-6 xl:w-[750px]">
      <div className="flex  items-center mb-4 xl:gap-x-[350px]">
        <h1 className="text-2xl font-bold">All Questions</h1>
        <div className="relative">
          <button onClick={handleFilterClick} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm w-48 justify-between">
            {selectedFilter} <FiChevronDown className="ml-2" />
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <button onClick={() => handleFilterSelect('Recommended')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Recommended
              </button>
              <button onClick={() => handleFilterSelect('Most Upvoted')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Most Upvoted
              </button>
              <button onClick={() => handleFilterSelect('Latest')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Latest
              </button>
              <button onClick={() => handleFilterSelect('No Answer')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                No Answer
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="border-gray-300" />
      <Hero/>
      <Hero/>
      <Hero/>
    </div>
  );
};

export default Questions;
