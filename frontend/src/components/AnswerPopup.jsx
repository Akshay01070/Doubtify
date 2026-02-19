// src/components/AnswerPopup.jsx
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../context/userContext';

const AnswerPopup = ({ onClose, question, draftData }) => {
  const [answer, setAnswer] = useState(draftData?.body || '');
  const [rows, setRows] = useState(3);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const maxRows = 8;
  const { backend_url, user } = useContext(UserContext);

  // If editing an answer draft without a question prop, fetch the question
  const [targetQuestion, setTargetQuestion] = useState(question || null);

  useEffect(() => {
    if (!question && draftData?.question_id) {
      axios.get(`${backend_url}/api/question/${draftData.question_id}`)
        .then(res => {
          if (res.data.success) setTargetQuestion(res.data.data);
        })
        .catch(err => console.error(err));
    }
  }, [backend_url, draftData, question]);

  const handleInputChange = (e) => {
    const textareaLineHeight = 24;
    e.target.rows = 1;
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);
    e.target.rows = currentRows < maxRows ? currentRows : maxRows;
    setRows(currentRows < maxRows ? currentRows : maxRows);
    setAnswer(e.target.value);
  };

  const handleAddAnswer = async () => {
    if (!answer.trim()) return;
    if (!user?._id) {
      alert('Please log in to publish an answer.');
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append('body', answer);
    files.forEach((file) => {
      formData.append('files', file);
    });
    try {
      const qId = targetQuestion?._id || draftData?.question_id;
      const response = await axios.post(
        `${backend_url}/api/answer/${user._id}/${qId}/add`,
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
      console.error('Error adding answer:', error);
      alert('Failed to add answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveAsDraft = async () => {
    if (!answer.trim()) return;
    if (!user?._id) {
      alert('Please log in to save drafts.');
      return;
    }
    try {
      await axios.post(`${backend_url}/api/draft/save`, {
        userId: user._id,
        body: answer,
        questionId: targetQuestion?._id || draftData?.question_id,
        type: 'answer',
        draftId: draftData?._id
      });
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  // Close handler: auto-save if there's content, always call onClose
  const handleClose = () => {
    if (answer.trim() && user?._id) {
      // Fire-and-forget save — don't block closing on network
      handleSaveAsDraft().catch(() => { });
    }
    onClose();
  };

  // Explicit save button handler
  const handleSaveClick = async () => {
    if (!answer.trim()) return;
    await handleSaveAsDraft();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-2xl relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors text-lg">
          &#10005;
        </button>
        <h2 className="text-lg font-semibold mb-1 text-gray-900">{draftData?._id ? 'Edit Draft Answer' : 'Write your answer'}</h2>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{targetQuestion?.body || 'Loading question...'}</p>
        <textarea
          className="w-full border border-gray-200 p-3 rounded-lg resize-none overflow-auto focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none transition-all text-sm"
          rows={rows}
          placeholder="Start typing your answer..."
          value={answer}
          onChange={handleInputChange}
          style={{ lineHeight: '24px' }}
        />
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center cursor-pointer text-sm">
            <input type="file" className="hidden" multiple onChange={(e) => setFiles([...e.target.files])} />
            <span className="text-blue-500 hover:text-blue-600 transition-colors">📎 Attach files</span>
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSaveClick}
              disabled={!answer.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!answer.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Save as Draft
            </button>
            <button
              onClick={handleAddAnswer}
              disabled={submitting || !answer.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${submitting || !answer.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm hover:shadow-md'
                }`}
            >
              {submitting ? 'Publishing...' : (draftData?._id ? 'Publish Draft' : 'Publish')}
            </button>
          </div>
        </div>
        {files.length > 0 && (
          <div className="mt-3">
            <ul className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <li key={index} className="text-gray-600 text-xs bg-gray-100 px-3 py-1 rounded-full">{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerPopup;
