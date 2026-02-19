import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/userContext';

const Profilecomp = ({ question }) => {
  const { backend_url } = useContext(UserContext);
  const [answerCount, setAnswerCount] = useState(0);

  useEffect(() => {
    if (question && question._id) {
      axios.get(`${backend_url}/api/answer/count/${question._id}`)
        .then(res => {
          if (res.data.success) setAnswerCount(res.data.count);
        })
        .catch(err => console.error(err));
    }
  }, [question, backend_url]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!question) return null;

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-bold mb-2">{question.body}</h2>
      <div className="flex items-center gap-4">
        <p className="text-gray-500 text-sm">Asked on {formatDate(question.createdAt)}</p>
        <p className="text-gray-500 text-sm">{answerCount} Answer{answerCount !== 1 ? 's' : ''}</p>
        {question.categories && (
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">{question.categories}</span>
        )}
      </div>
    </div>
  );
};

export default Profilecomp;
