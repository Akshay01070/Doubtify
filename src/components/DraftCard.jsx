import React from 'react';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';

const DraftCard = () => {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md w-[750px]">
      <div className="absolute top-2 left-4 text-gray-600 text-xs">Answer • Unpublished</div>
      <button className="absolute top-2 right-4 text-gray-500 hover:text-gray-700">
        <FaTimes />
      </button>
      <div className="mt-2 mb-4">
        <h2 className="text-lg font-bold">How can I learn data structures efficiently?</h2>
        <p className="text-gray-700 mt-1 font-light leading-5">
          Efficiently learning data structures involves a balance of theoretical study and practical application. Use visualization tools, implement structures from scratch, solve a variety of problems, engage with the community, and regularly review and practice. Over time, your understanding and proficiency will deepen, enabling you to apply data structures effectively in real-world scenarios. And most important thing is that you have to
        </p>
      </div>
      <div className="flex space-x-4 mt-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
          <FaEdit className="mr-2" /> Edit
        </button>
        <button className="flex items-center px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
          <FaTrashAlt className="mr-2" /> Discard
        </button>
      </div>
    </div>
  );
};

export default DraftCard;
