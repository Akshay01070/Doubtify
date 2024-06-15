import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  PencilIcon,
  BookmarkIcon,
  TagIcon,
} from '@heroicons/react/outline';

const LeftSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === '/') {
      handleButtonClick('/home');
    }
  }, [location.pathname]);

  const handleButtonClick = (path) => {
    setActiveButton(path);
    if (window.innerWidth <= 768) {
      toggleSidebar(); // Close sidebar on mobile after clicking a link
    }
  };

  return (
    <div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 xl:w-64 lg:w-48 md:w-36 md:p-2 h-full bg-gray-200 shadow-lg  p-4 flex flex-col space-y-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Link
          to="/home"
          onClick={() => handleButtonClick('/home')}
          className={`mt-20 flex items-center space-x-2 w-full h-14 ${
            activeButton === '/home'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md'
              : 'bg-transparent text-black'
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <HomeIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-lg md:text-base">Home</span>
          </div>
        </Link>
        <Link
          to="/questions"
          onClick={() => handleButtonClick('/questions')}
          className={`flex items-center space-x-2 w-full h-14 ${
            activeButton === '/questions'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md'
              : 'bg-transparent text-black'
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <QuestionMarkCircleIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-lg md:text-base">Questions</span>
          </div>
        </Link>
        <Link
          to="/profile"
          onClick={() => handleButtonClick('/profile')}
          className={`flex items-center space-x-2 w-full h-14 ${
            activeButton === '/profile'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md'
              : 'bg-transparent text-black'
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <UserIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-lg md:text-base">Profile</span>
          </div>
        </Link>
        <Link
          to="/drafts"
          onClick={() => handleButtonClick('/drafts')}
          className={`flex items-center space-x-2 w-full h-14 ${
            activeButton === '/drafts'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md'
              : 'bg-transparent text-black'
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <PencilIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-lg md:text-base">Drafts</span>
          </div>
        </Link>
        <Link
          to="/bookmarks"
          onClick={() => handleButtonClick('/bookmarks')}
          className={`flex items-center space-x-2 w-full h-14 ${
            activeButton === '/bookmarks'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md'
              : 'bg-transparent text-black'
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <BookmarkIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-lg md:text-base">Bookmarks</span>
          </div>
        </Link>
        <Link
          to="/categories"
          onClick={() => handleButtonClick('/categories')}
          className={`flex items-center space-x-2 w-full h-14 ${
            activeButton === '/categories'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md'
              : 'bg-transparent text-black'
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <TagIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-lg md:text-base">Categories</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
