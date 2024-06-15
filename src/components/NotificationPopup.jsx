import React from 'react';
import userImage from '../assets/user.png'; // Ensure the path is correct

const notifications = [
  { user: 'Username', action: 'has Answered your question', time: '2 hours ago' },
  { user: 'Username1', action: 'has Answered your question', time: '9 hours ago' },
  { user: 'Username2', action: 'has commented on your answer', time: '17 hours ago' },
  { user: 'Username', action: 'has reacted to your answer', time: '23 hours ago' },
  { user: 'Username', action: 'has Answered your question', time: '1 day ago' },
  { user: 'Username', action: 'has Answered your question', time: '5 days ago' },
  { user: 'Username', action: 'has Answered ddquestion', time: '2 hours ago' },
  { user: 'Username1', action: 'has Answered your question', time: '9 hours ago' },
  { user: 'Username2', action: 'has commented on your answer', time: '17 hours ago' },
  { user: 'Username', action: 'has reacted to your answer', time: '23 hours ago' },
  { user: 'Username', action: 'has Answered your question', time: '1 day ago' },
  { user: 'Username', action: 'has Answered your question', time: '5 days ago' },
  // Add more notifications as needed
];

const NotificationPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex  bg-black bg-opacity-50">
      <div className="relative bg-white lg:w-60 xl:w-96 max-h-96 mt-14 xl:ml-[930px] lg:ml-[601px] rounded-lg shadow-lg overflow-hidden">
        
        <div className="sticky flex lg:gap-28 xl:gap-56 top-0 bg-white z-10 p-4 border-b">
          <h3 className=" xl:text-xl text-base font-semibold">Notification</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &#10005;
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start space-x-3">
              <img src={userImage} alt="User" className="xl:w-10 w-6 xl:h-10 h-6 rounded-full" />
              <div>
                <p className="text-xs"><span className="font-semibold">@{notification.user}</span> {notification.action}</p>
                <p className="text-[8px] text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
