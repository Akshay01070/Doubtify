import React, { useState, useContext, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Hero from '../components/Hero';
import UserContext from '../context/userContext';
import axios from 'axios';

const Bookmarks = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Latest');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backend_url, user } = useContext(UserContext);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/api/bookmark/user/${user._id}`);
        if (response.data.success) {
          setQuestions(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [backend_url, user?._id]);

  const handleUnbookmark = (questionId) => {
    setQuestions(prev => prev.filter(q => q._id !== questionId));
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (selectedFilter === 'Latest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (selectedFilter === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  return (
    <div className="w-full flex flex-col max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {selectedFilter} <FiChevronDown size={14} />
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden">
              {['Latest', 'Oldest'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => { setSelectedFilter(filter); setShowFilter(false); }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selectedFilter === filter ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr className="border-gray-200 mb-2" />
      <div className="flex flex-col">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : sortedQuestions.length > 0 ? (
          sortedQuestions.map((ques) => (
            <Hero question={ques} key={ques._id} onUnbookmark={handleUnbookmark} />
          ))
        ) : (
          <div className="text-center text-gray-400 py-16">
            <span className="text-4xl block mb-4">🔖</span>
            <p className="text-lg font-medium">No bookmarks yet</p>
            <p className="text-sm mt-1">Bookmark questions to find them here later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
