import React, { useState, useContext, useEffect } from 'react';
import DraftCard from '../components/DraftCard';
import UserContext from '../context/userContext';
import axios from 'axios';

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backend_url, user } = useContext(UserContext);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/api/draft/user/${user._id}`);
        if (response.data.success) {
          setDrafts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching drafts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrafts();
  }, [backend_url, user?._id]);

  const handleDelete = async (draftId) => {
    try {
      await axios.delete(`${backend_url}/api/draft/${draftId}`);
      setDrafts(drafts.filter(d => d._id !== draftId));
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  return (
    <div className="w-full flex flex-col max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Drafts</h1>
      <hr className="border-gray-200 mb-4" />
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : drafts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {drafts.map((draft) => (
            <DraftCard draft={draft} key={draft._id} onDelete={() => handleDelete(draft._id)} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-16">
          <span className="text-4xl block mb-4">📝</span>
          <p className="text-lg font-medium">No drafts yet</p>
          <p className="text-sm mt-1">Save answers as drafts when you're not ready to publish.</p>
        </div>
      )}
    </div>
  );
};

export default Drafts;
