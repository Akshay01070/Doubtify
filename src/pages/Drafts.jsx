import React from 'react';
import DraftCard from '../components/DraftCard';
const Drafts = () => {
  return <div className='gap-y-8 flex flex-col '>
    <div className="sticky top-0 bg-white w-[800px]   p-4">
        <div className="flex  mb-6">
          <h1 className="text-2xl font-bold">Drafts</h1>
          
        </div>
        <hr className="border-gray-300 mb-8" />
      </div>
    <DraftCard/>
    <DraftCard/>
    <DraftCard/>
  </div>;
};

export default Drafts;
