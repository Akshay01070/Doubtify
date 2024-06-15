import React, { useEffect } from 'react';
import Profilecomp from '../components/Profilecomp';
import { FaCalendarAlt } from 'react-icons/fa';
const Profile = () => {
  
  return <div className=''>
    <div className="max-w-[800px] p-4 bg-white rounded-lg  w-[850px]">
    <div className="flex items-start mb-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Akshay Shinde</h1>
          <p className="text-gray-600">Second year CSE student ,IIITM Gwalior</p>
          <div className="flex items-center text-gray-500 mt-1">
            <FaCalendarAlt className="mr-2" />
            <span>Joined May 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
      <hr className="border-gray-300 mb-4" />
      <p className="text-gray-700 mb-4">
        Hi all, my name is Akshay Shinde and I am from Navi Mumbai, Maharashtra. I am currently pursuing my BTECH in Computer Science and Engineering from IIIT Gwalior. I am currently in my 2nd year and I am here to seek help and clarify my doubts on various topics related to my coursework.
      </p>
      <h1 className="text-xl font-semibold mb-2">Area of Interest</h1>
      <div className="flex space-x-2 mb-4">
        <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">Web Development</span>
        <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">Data Structures</span>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between mb-4">
        <button className="text-purple-600 text-lg font-bold focus:outline-none">4 Questions</button>
        <button className="text-gray-600 focus:outline-none">2 Answers</button>
        <button className="text-gray-600 focus:outline-none">Comments</button>
        <button className="text-gray-600 focus:outline-none">Upvotes</button>
      </div>
      <hr className="border-gray-300 mb-4" />
      <h1 className="text-xl font-semibold mb-2">Questions Asked</h1>
    </div>
    <div className='gap-y-5  mt-3 flex flex-col'>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    <Profilecomp/>
    </div>
  </div>;
};

export default Profile;
