import React, { useState } from 'react';
import { BellIcon, Bars3Icon } from '@heroicons/react/24/solid'; // Import Bars3Icon for the hamburger button
import { Link, useNavigate } from 'react-router-dom';
import userImage from '../assets/user.png';
import searchIcon from '../assets/search.png';
import AskQuestionPopup from './AskQuestionPopup';
import NotificationPopup from './NotificationPopup';

const NavBar = ({ toggleSidebar }) => { // Accept toggleSidebar prop
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
    window.location.reload();
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 p-2 xl:p-4 shadow-md fixed top-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={toggleSidebar}>
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
          <div className="text-lg font-bold">My App</div>
        </div>
        
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search"
            className="ml-4 md:ml-[200px] lg:ml-[350px] xl:ml-[470px] w-[100px] md:w-[300px] lg:w-[400px] xl:w-[550px] pl-7 xl:pl-10 pr-4 py-1 xl:py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundSize: '16px',
              backgroundPosition: '8px center ',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
          <BellIcon className="h-6 w-6 md:h-9 md:w-9 text-gray-700 cursor-pointer" onClick={() => setIsNotificationOpen(true)} />
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs md:text-base px-1 py-1 md:px-4 md:py-2 rounded-full hover:from-blue-500 hover:to-blue-700"
            onClick={() => setIsPopupOpen(true)}
          >
            Ask a Question
          </button>
          <div className="relative">
            <img
              src={userImage}
              alt="User"
              className="w-6 h-6 md:w-9 md:h-9 rounded-full border border-gray-300 cursor-pointer"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <Link to="#" onClick={handleProfileClick} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">View Profile</Link>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isNotificationOpen && <NotificationPopup onClose={() => setIsNotificationOpen(false)} />}
      {isPopupOpen && <AskQuestionPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default NavBar;
