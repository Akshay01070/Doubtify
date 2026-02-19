import React, { useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import AskQuestionPopup from './AskQuestionPopup';
import AnswerPopup from './AnswerPopup';

const DraftCard = ({ draft, onDelete }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${draft.type === 'question' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
              }`}>
              {draft.type || 'answer'}
            </span>
            <p className="text-xs text-gray-400">{formatDate(draft.createdAt)}</p>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">{draft.body}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditPopup(true)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all flex-shrink-0"
            title="Edit draft"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
            title="Discard draft"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {showEditPopup && (
        draft.type === 'question' ? (
          <AskQuestionPopup onClose={() => setShowEditPopup(false)} draftData={draft} />
        ) : (
          <AnswerPopup onClose={() => setShowEditPopup(false)} draftData={draft} />
        )
      )}
    </div>
  );
};

export default DraftCard;
