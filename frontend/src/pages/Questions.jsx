import React, { useEffect, useState, useContext } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import axios from 'axios';
import UserContext from '../context/userContext';

const Questions = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Latest');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backend_url } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `${backend_url}/api/question/questions`;
        if (searchQuery) {
          url = `${backend_url}/api/question/search?q=${encodeURIComponent(searchQuery)}`;
        }
        const response = await axios.get(url);
        if (response.data.success) {
          setQuestions(response.data.data);
        }
      } catch (error) {
        console.error('Error displaying questions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [backend_url, searchQuery]);

  // Fetch categories
  useEffect(() => {
    axios.get(`${backend_url}/api/question/categories`)
      .then(res => {
        if (res.data.success) setCategories(res.data.data);
      })
      .catch(err => console.error(err));
  }, [backend_url]);

  // Filter by category
  const filteredByCategory = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.categories === selectedCategory);

  // Sort based on selected filter
  const sortedQuestions = [...filteredByCategory].sort((a, b) => {
    switch (selectedFilter) {
      case 'Latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'Most Upvoted':
        return (b.upvotes || 0) - (a.upvotes || 0);
      case 'Oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  return (
    <div className="w-full flex flex-col max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Questions'}
            <span className="text-gray-400 text-lg ml-2">({sortedQuestions.length})</span>
          </h1>
          <div className="flex gap-2">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowCategoryFilter(!showCategoryFilter); setShowFilter(false); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${selectedCategory !== 'All'
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {selectedCategory === 'All' ? '🏷️ Category' : selectedCategory}
                {selectedCategory !== 'All' && (
                  <FiX size={14} className="ml-1 hover:text-red-500" onClick={(e) => { e.stopPropagation(); setSelectedCategory('All'); }} />
                )}
                <FiChevronDown size={14} />
              </button>
              {showCategoryFilter && (
                <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden max-h-64 overflow-y-auto">
                  <button
                    onClick={() => { setSelectedCategory('All'); setShowCategoryFilter(false); }}
                    className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === 'All' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedCategory(cat._id); setShowCategoryFilter(false); }}
                      className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === cat._id ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700'}`}
                    >
                      {cat._id}
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowFilter(!showFilter); setShowCategoryFilter(false); }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {selectedFilter} <FiChevronDown size={14} />
              </button>
              {showFilter && (
                <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden">
                  {['Latest', 'Most Upvoted', 'Oldest'].map((filter) => (
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
        </div>
        <hr className="mt-3 border-gray-200" />
      </div>

      {/* Questions List */}
      <div className="flex flex-col">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : sortedQuestions.length > 0 ? (
          sortedQuestions.map((ques) => (
            <Hero question={ques} key={ques._id} />
          ))
        ) : (
          <div className="text-center text-gray-400 py-16">
            <span className="text-4xl block mb-4">❓</span>
            <p className="text-lg font-medium">No questions found</p>
            <p className="text-sm mt-1">
              {searchQuery ? 'Try a different search term.' : 'Be the first to ask a question!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
