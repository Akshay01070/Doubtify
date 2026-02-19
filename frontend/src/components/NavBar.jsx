import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BellIcon } from '@heroicons/react/solid';
import { MenuIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';
import AskQuestionPopup from './AskQuestionPopup';
import NotificationPopup from './NotificationPopup';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';

const NavBar = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const { setToken, setUser, token, user, backend_url } = useContext(UserContext);
  const loading = useFetchUser(token, setUser);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      const res = await axios.get(`${backend_url}/api/question/search?q=${encodeURIComponent(query)}`);
      if (res.data.success) {
        setSearchResults(res.data.data.slice(0, 5)); // Show top 5
        setShowResults(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogOut = () => {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      localStorage.removeItem("token");
      setToken("");
      setUser({
        _id: '', firstName: '', lastName: '', email: '',
        profile_picture: null, bio: '', interests: [], createdAt: ''
      });
      navigate('/signin');
    }
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    navigate('/profile');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowResults(false);
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getInitials = () => {
    const first = user && user.firstName ? user.firstName[0] : '';
    const last = user && user.lastName ? user.lastName[0] : '';
    return (first + last).toUpperCase() || '?';
  };

  return (
    <div onClick={() => setShowResults(false)}>
      <div className="flex items-center justify-between bg-white p-3 shadow-sm fixed top-0 w-full z-50 border-b border-gray-200">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          <button className="md:hidden p-1" onClick={toggleSidebar}>
            <MenuIcon className='w-6 h-6 text-gray-700' />
          </button>
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="hidden lg:block text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Doubtify
            </span>
          </Link>
        </div>

        {/* Center: search */}
        <div className="flex-1 flex justify-center mx-4 relative" onClick={(e) => e.stopPropagation()}>
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm transition-all"
            />

            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-[60]">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result._id}
                      onClick={() => {
                        navigate(`/answer/${result._id}`);
                        setShowResults(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                    >
                      <p className="text-sm text-gray-800 line-clamp-1 font-medium">{result.body}</p>
                      <span className="text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-full">{result.categories}</span>
                    </div>
                  ))
                ) : null}
                {isSearching && (
                  <div className="px-4 py-3 text-center text-xs text-gray-400">Searching...</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsNotificationOpen(true)}
          >
            <BellIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs md:text-sm px-3 py-2 md:px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 font-medium whitespace-nowrap transition-all shadow-sm hover:shadow-md"
            onClick={() => setIsPopupOpen(true)}
          >
            Ask a Question
          </button>
          <div className="relative">
            {user && user.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer object-cover hover:border-blue-400 transition-colors"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="text-white text-xs font-bold">{getInitials()}</span>
              </div>
            )}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-100 overflow-hidden">
                <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">View Profile</button>
                <hr className="border-gray-100" />
                <button className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors" onClick={handleLogOut}>Logout</button>
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
