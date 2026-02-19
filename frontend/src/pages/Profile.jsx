import React, { useContext, useState, useEffect } from 'react';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import UserContext from '../context/userContext';
import useFetchUser from '../hooks/useFetchUser';
import InterestModal from '../components/InterestModal';
import Profilecomp from '../components/Profilecomp';
import axios from 'axios';

const Profile = () => {
  const { setUser, token, user, backend_url } = useContext(UserContext);
  const loading = useFetchUser(token, setUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [editData, setEditData] = useState({ firstName: '', lastName: '', bio: '' });
  const [activeTab, setActiveTab] = useState('questions');

  useEffect(() => {
    if (user && user._id) {
      setEditData({ firstName: user.firstName, lastName: user.lastName, bio: user.bio || '' });
      // Fetch user's questions
      axios.get(`${backend_url}/api/question/get/${user._id}`)
        .then(res => {
          if (res.data.success) setQuestions(res.data.data);
        })
        .catch(err => console.error(err));

      // Fetch user's answer count
      axios.get(`${backend_url}/api/answer/user/${user._id}`)
        .then(res => {
          if (res.data.success) setAnswerCount(res.data.data.length);
        })
        .catch(err => console.error(err));
    }
  }, [user._id, backend_url]);

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put(`${backend_url}/api/user/update`, editData, {
        headers: { token }
      });
      if (res.data.success) {
        setUser(res.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getInitials = () => {
    const first = user.firstName ? user.firstName[0] : '';
    const last = user.lastName ? user.lastName[0] : '';
    return (first + last).toUpperCase();
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <InterestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={user._id} />

      <div className="md:w-1/2 w-full mt-5 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          {user.profile_picture ? (
            <img src={user.profile_picture} alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full mr-6 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{getInitials()}</span>
            </div>
          )}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input value={editData.firstName} onChange={e => setEditData({ ...editData, firstName: e.target.value })}
                    className="border rounded px-2 py-1 text-sm w-1/2" placeholder="First name" />
                  <input value={editData.lastName} onChange={e => setEditData({ ...editData, lastName: e.target.value })}
                    className="border rounded px-2 py-1 text-sm w-1/2" placeholder="Last name" />
                </div>
                <textarea value={editData.bio} onChange={e => setEditData({ ...editData, bio: e.target.value })}
                  className="border rounded px-2 py-1 text-sm w-full" placeholder="Write your bio..." rows={2} />
                <div className="flex gap-2">
                  <button onClick={handleSaveProfile} className="bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600">Save</button>
                  <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-300">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-gray-600">{user.bio || 'No bio yet — click Edit Profile to add one.'}</p>
                <div className="flex items-center text-gray-500 mt-1">
                  <FaCalendarAlt className="mr-2" />
                  <span>Joined on {formatDate(user.createdAt)}</span>
                </div>
              </>
            )}
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 text-sm">
              Edit Profile
            </button>
          )}
        </div>

        <hr className="border-gray-300 mb-4" />

        {/* Area of Interest */}
        <div className='flex items-center gap-3 mb-2'>
          <h1 className="text-xl font-semibold">Area of Interest</h1>
          <button className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
            <FaEdit className="mr-1" /> Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {user.interests && user.interests.length > 0 ? (
            user.interests.map((interest, index) => (
              <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm" key={index}>{interest}</span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No interests added yet.</p>
          )}
        </div>

        <hr className="border-gray-300 mb-4" />

        {/* Stats Tabs */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setActiveTab('questions')}
            className={`font-bold ${activeTab === 'questions' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            {questions.length} Questions
          </button>
          <button
            onClick={() => setActiveTab('answers')}
            className={`${activeTab === 'answers' ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
          >
            {answerCount} Answers
          </button>
        </div>

        <hr className="border-gray-300 mb-4" />
        <h1 className="text-xl font-semibold mb-2">
          {activeTab === 'questions' ? 'Questions Asked' : 'Answers Given'}
        </h1>
      </div>

      <div className='w-full md:w-1/2 gap-y-3 mt-3 flex flex-col mb-8'>
        {activeTab === 'questions' && (
          questions.length > 0 ? (
            questions.map((q) => <Profilecomp question={q} key={q._id} />)
          ) : (
            <div className="text-center text-gray-400 py-8">You haven't asked any questions yet.</div>
          )
        )}
        {activeTab === 'answers' && (
          <div className="text-center text-gray-400 py-8">
            You have given {answerCount} answer{answerCount !== 1 ? 's' : ''}.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
