import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  PencilIcon,
  BookmarkIcon,
} from '@heroicons/react/outline';

const LeftSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  const handleButtonClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  const navItems = [
    { path: '/home', label: 'Home', icon: HomeIcon },
    { path: '/questions', label: 'Questions', icon: QuestionMarkCircleIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
    { path: '/drafts', label: 'Drafts', icon: PencilIcon },
    { path: '/bookmarks', label: 'Bookmarks', icon: BookmarkIcon },
  ];

  return (
    <div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-56 lg:w-52 xl:w-60 h-full bg-white border-r border-gray-200 py-4 px-3 flex flex-col transform transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="mt-16 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeButton === item.path || (item.path === '/home' && activeButton === '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleButtonClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
