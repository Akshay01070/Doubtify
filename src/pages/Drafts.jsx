import React from 'react';
import DraftCard from '../components/DraftCard';
const Drafts = () => {
  return <div className='ml-96 gap-y-8 flex flex-col '>
    <div className="sticky top-0 bg-white z-20  p-4">
        <div className="flex justify-between mb-6">
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
