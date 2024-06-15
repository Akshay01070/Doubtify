import React from 'react';
import searchIcon from '../assets/search.png'; // Ensure the path is correct
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  return (
    <div className=" xl:w-[860px] lg:w-[550px] h-screen">
      <div className="sticky top-0 bg-white z-20  p-4">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <input
            type="text"
            placeholder="Search"
            className="w-30 md:w-30 lg:w-30 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundSize: '16px',
              backgroundPosition: '10px center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        <hr className="border-gray-300 mb-8" />
      </div>
      
      <div className="flex flex-wrap gap-4 mt-4 ml-[50px]">
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        <CategoryCard category="Blockchain" count="2531285" />
        {/* Add more CategoryCard components here */}
      </div>
    </div>
  );
};

export default Categories;
