// src/components/RightSidebar.jsx
import React from 'react';

const RightSidebar = () => {
  return (
    <div className="fixed top-16 right-0 w-1/5 h-full bg-[#F5F2FF] shadow-lg p-4 flex flex-col space-y-2 md:w-1/4 lg:w-1/5 ">
      <div className="h-full bg-white p-4 flex flex-col space-y-2 rounded-lg">
        <h3 className="text-xl lg:text-2xl text-center font-bold mb-1">Top Categories</h3>
        <button className="w-full h-12 bg-[#F4F6F8] text-[#858EAC] rounded-3xl hover:bg-[#F0F2F4] text-sm md:text-base lg:text-lg">Artificial intelligence</button>
        <button className="w-full h-12 bg-[#F4F6F8] text-[#858EAC] rounded-3xl hover:bg-[#F0F2F4] text-sm md:text-base lg:text-lg">Machine learning</button>
        <button className="w-full h-12 bg-[#F4F6F8] text-[#858EAC] rounded-3xl hover:bg-[#F0F2F4] text-sm md:text-base lg:text-lg">Data structure</button>
        <button className="w-full h-12 bg-[#F4F6F8] text-[#858EAC] rounded-3xl hover:bg-[#F0F2F4] text-sm md:text-base lg:text-lg">Operating Systems</button>
        <button className="w-full h-12 bg-[#F4F6F8] text-[#858EAC] rounded-3xl hover:bg-[#F0F2F4] text-sm md:text-base lg:text-lg">Data science</button>
        <button className="w-full h-12 bg-[#F4F6F8] text-[#858EAC] rounded-3xl hover:bg-[#F0F2F4] text-sm md:text-base lg:text-lg">Cryptography</button>
      </div>    
    </div>
  );
};

export default RightSidebar;
