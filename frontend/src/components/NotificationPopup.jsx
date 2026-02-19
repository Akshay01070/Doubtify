import React from 'react';

const NotificationPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30" onClick={onClose}>
      <div
        className="relative bg-white w-80 max-h-[80vh] mt-14 mr-4 rounded-xl shadow-xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-lg">
            &#10005;
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <span className="text-4xl mb-4">🔔</span>
          <p className="text-gray-500 font-medium text-sm">No notifications yet</p>
          <p className="text-gray-400 text-xs mt-1 text-center">
            You'll be notified when someone answers your questions or interacts with your content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
