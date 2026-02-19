import React, { useContext, useState, useEffect } from 'react';
import Hero from '../components/Hero';
import UserContext from '../context/userContext';
import axios from 'axios';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backend_url } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/api/question/questions`);
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
  }, [backend_url]);

  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : questions.length > 0 ? (
        questions.map((ques) => (
          <Hero question={ques} key={ques._id} />
        ))
      ) : (
        <div className="text-center text-gray-400 py-16">
          <span className="text-4xl block mb-4">🏠</span>
          <p className="text-lg font-medium">No questions yet</p>
          <p className="text-sm mt-1">Ask the first question to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
