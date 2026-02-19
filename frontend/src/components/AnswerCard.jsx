import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/userContext';

const AnswerCard = ({ answer }) => {
  const [answerUser, setAnswerUser] = useState(null);
  const { backend_url } = useContext(UserContext);

  useEffect(() => {
    if (answer && answer.userId) {
      axios.post(`${backend_url}/api/user/otheruserInfo`, { userId: answer.userId })
        .then(res => { if (res.data.success) setAnswerUser(res.data.user); })
        .catch(err => console.error(err));
    }
  }, [backend_url, answer]);

  const getInitials = () => {
    if (!answerUser) return '??';
    const first = answerUser.firstName ? answerUser.firstName[0] : '';
    const last = answerUser.lastName ? answerUser.lastName[0] : '';
    return (first + last).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center mb-3">
        {answerUser && answerUser.profile_picture ? (
          <img src={answerUser.profile_picture} alt="" className="w-9 h-9 rounded-full mr-3 object-cover ring-2 ring-gray-100" />
        ) : (
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full w-9 h-9 flex items-center justify-center mr-3 ring-2 ring-emerald-50">
            <span className="text-white text-xs font-bold">{getInitials()}</span>
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            {answerUser ? `${answerUser.firstName} ${answerUser.lastName}` : '...'}
          </h4>
          <p className="text-xs text-gray-400">{formatDate(answer.createdAt)}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{answer.body}</p>
      {answer.files && answer.files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {answer.files.map((file, i) => (
            <a key={i} href={file} target="_blank" rel="noreferrer" className="text-xs text-blue-500 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
              📎 Attachment {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
