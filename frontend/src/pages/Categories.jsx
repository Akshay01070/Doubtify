import React, { useState, useEffect, useContext } from 'react';
import searchIcon from '../assets/search.png';
import CategoryCard from '../components/CategoryCard';
import axios from 'axios';
import UserContext from '../context/userContext';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { backend_url } = useContext(UserContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/api/question/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [backend_url]);

  const filteredCategories = categories.filter(cat =>
    cat._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-screen p-6 flex flex-col items-center">
      <div className='md:w-1/2 w-full'>
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">Categories</h1>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundSize: '16px',
              backgroundPosition: '10px center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        <hr className="mt-3 border-gray-300" />
      </div>

      <div className="flex justify-center items-center">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-5">
            {filteredCategories.map((cat, index) => (
              <CategoryCard category={cat._id} count={cat.count.toString()} key={index} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-16">
            <span className="text-4xl block mb-4">🏷️</span>
            <p className="text-lg font-medium">No categories yet</p>
            <p className="text-sm mt-1">Categories will appear here when questions are asked.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
