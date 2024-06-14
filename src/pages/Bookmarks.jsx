import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';

const Bookmarks = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilter(false);
  };
  return(
    <div className="p-6 ml-80">
      <div className="flex justify-between items-center mb-4 gap-x-[470px]">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <div className="relative">
          <button onClick={handleFilterClick} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm w-48 justify-between">
            {selectedFilter} <FiChevronDown className="ml-2" />
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <button onClick={() => handleFilterSelect('Recommended')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Recommended
              </button>
             
              <button onClick={() => handleFilterSelect('Latest')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Latest
              </button>
              <button onClick={() => handleFilterSelect('Oldest')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Oldest
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
  )
   
  
};

export default Bookmarks;
