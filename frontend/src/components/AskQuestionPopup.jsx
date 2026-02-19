import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/userContext';

const AskQuestionPopup = ({ onClose, draftData }) => {
  const [category, setCategory] = useState(draftData?.category || '');
  const [subCategory, setSubCategory] = useState(draftData?.subCategories || '');
  const [question, setQuestion] = useState(draftData?.body || '');
  const [rows, setRows] = useState(3);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const maxRows = 8;

  const { backend_url, user } = useContext(UserContext);

  // Predefined categories
  const defaultCategories = [
    'Data Structures', 'Algorithms', 'Web Development', 'Machine Learning',
    'Database', 'Operating Systems', 'Computer Networks', 'Mathematics',
    'Programming', 'Blockchain', 'Cloud Computing', 'DevOps',
    'Cybersecurity', 'Mobile Development', 'Other'
  ];

  const handleInputChange = (e) => {
    const textareaLineHeight = 24;
    e.target.rows = 1;
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);
    e.target.rows = currentRows < maxRows ? currentRows : maxRows;
    setRows(currentRows < maxRows ? currentRows : maxRows);
    setQuestion(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleAddQuestion = async () => {
    if (!question.trim()) return;
    if (!user?._id) {
      alert('Please log in to post a question.');
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    formData.append('body', question);
    formData.append('categories', category);
    formData.append('subCategories', subCategory);
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(
        `${backend_url}/api/question/${user._id}/add`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data.success) {
        // Delete original draft if it was being published
        if (draftData?._id) {
          try {
            await axios.delete(`${backend_url}/api/draft/${draftData._id}`);
          } catch (e) {
            console.error('Error deleting draft:', e);
          }
        }
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveAsDraft = async () => {
    if (!question.trim()) return;
    if (!user?._id) {
      alert('Please log in to save drafts.');
      return;
    }
    try {
      await axios.post(`${backend_url}/api/draft/save`, {
        userId: user._id,
        body: question,
        category: category,
        type: 'question',
        draftId: draftData?._id
      });
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  // Close handler: auto-save if there's content, always call onClose
  const handleClose = () => {
    if (question.trim() && user?._id) {
      // Fire-and-forget save — don't block closing on network
      handleSaveAsDraft().catch(() => { });
    }
    onClose();
  };

  // Explicit save button handler
  const handleSaveClick = async () => {
    if (!question.trim()) return;
    await handleSaveAsDraft();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-4/5 md:w-3/5 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &#10005;
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center">{draftData?._id ? 'Edit Draft Question' : 'Ask a Question'}</h2>
        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 p-3 rounded resize-none overflow-auto focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
            rows={rows}
            placeholder="What's your question? Be specific..."
            value={question}
            onChange={handleInputChange}
            style={{ lineHeight: '24px' }}
          />
        </div>
        <div className='flex flex-col sm:flex-row gap-3'>
          <div className="mb-4">
            <select
              className="w-48 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {defaultCategories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center cursor-pointer">
            <input type="file" className="hidden" multiple onChange={handleFileChange} />
            <span className="text-blue-500 hover:text-blue-600">📎 Attach files</span>
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSaveClick}
              disabled={!question.trim()}
              className={`px-6 py-2 rounded font-medium transition-all ${!question.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Save as Draft
            </button>
            <button
              onClick={handleAddQuestion}
              disabled={submitting || !question.trim()}
              className={`px-6 py-2 rounded text-white font-medium transition-all ${submitting || !question.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700'
                }`}
            >
              {submitting ? 'Posting...' : (draftData?._id ? 'Publish Draft' : 'Post Question')}
            </button>
          </div>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-sm">Attached Files:</h4>
            <ul className="flex flex-wrap gap-3">
              {files.map((file, index) => (
                <li key={index} className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-full">{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskQuestionPopup;
