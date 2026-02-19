// import React, { useState,useEffect, useContext } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import UserContext from '../context/userContext';

// Modal.setAppElement('#root'); // This is important for accessibility

// const InterestModal = ({ isOpen, onClose, userId }) => {
//   const [availableInterests, setAvailableInterests] = useState([]);
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const {backend_url} = useContext(UserContext);
//   // Fetch available interests when the modal is opened
//   useEffect(() => {
//     if (isOpen) {
//       axios.get('http://localhost:3000/api/interests').then((response) => {
//         setAvailableInterests(response.data[0].names);
//       });
//     }
//   }, [isOpen]);

//   console.log(availableInterests);

//   const handleInterestChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedInterests([...selectedInterests, value]);
//     } else {
//       setSelectedInterests(selectedInterests.filter((interest) => interest !== value));
//     }
//   };

//   const handleSubmit = () => {
//     axios.put(`${backend_url}/api/user/${userId}/interests`, { interests: selectedInterests })
//       .then(() => {
//         onClose();
//       });
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Select Interests">
//       <h2>Select Your Areas of Interest</h2>
//       <form>
//         {availableInterests.map((interest,index) => (
//           <div key={index}>
//             <label>
//               <input
//                 type="checkbox"
//                 value={interest}
//                 onChange={handleInterestChange}
//               />
//               {interest}
//             </label>
//           </div>
//         ))}
//         <button type="button" onClick={handleSubmit}>Submit</button>
//       </form>
//     </Modal>
//   );
// };

// export default InterestModal;


// src/InterestModal.js
// import React, { useState, useEffect ,useContext} from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import UserContext from '../context/userContext';


// Modal.setAppElement('#root'); // This is important for accessibility

// const InterestModal = ({ isOpen, onClose, userId }) => {
//   const [availableInterests, setAvailableInterests] = useState([]);
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const {backend_url} = useContext(UserContext);

//   useEffect(() => {
//     if (isOpen) {
//       axios.get('http://localhost:3000/api/interests')
//         .then((response) => {
//           if (response.data.length > 0) {
//             setAvailableInterests(response.data[0].names);
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching interests:', error);
//         });
//     }
//   }, [isOpen]);

//   const handleInterestChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedInterests([...selectedInterests, value]);
//     } else {
//       setSelectedInterests(selectedInterests.filter((interest) => interest !== value));
//     }
//   };

//   const handleSubmit = () => {
//     axios.put(`${backend_url}/api/user/${userId}/interests`, { interests: selectedInterests })
//       .then(() => {
//         onClose();
//       })
//       .catch((error) => {
//         console.error('Error updating interests:', error);
//       });
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Select Interests" className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-20">
//       <h2 className="text-xl font-semibold mb-4">Select Your Areas of Interest</h2>
//       <form>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {availableInterests.map((interest, index) => (
//             <div key={index} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`interest-${index}`}
//                 value={interest}
//                 onChange={handleInterestChange}
//                 className="mr-2"
//               />
//               <label htmlFor={`interest-${index}`} className="text-sm">
//                 {interest}
//               </label>
//             </div>
//           ))}
//         </div>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </Modal>
//   );
// };

// export default InterestModal;


// src/InterestModal.js

import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import UserContext from '../context/userContext';

Modal.setAppElement('#root'); // This is important for accessibility

const InterestModal = ({ isOpen, onClose, userId }) => {
  const [availableInterests, setAvailableInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { backend_url } = useContext(UserContext);
  
  useEffect(() => {
    if (isOpen) {
      axios.get(`${backend_url}/api/user/${userId}/interests`)
        .then((response) => {
          // console.log(response.data.user.interests);
            setSelectedInterests(response.data.user.interests);
        })
        .catch((error) => {
          console.error('Error fetching interests:', error);
        });
    }
  }, [isOpen, backend_url]);

  useEffect(() => {
    if (isOpen) {
      axios.get(`${backend_url}/api/interests`)
        .then((response) => {
          if (response.data.length > 0) {
            const allInterests = response.data[0].names;
            const filteredInterest = allInterests.filter(interest=>!selectedInterests.includes(interest));
            console.log("Filtered Interest: ",filteredInterest);
            setAvailableInterests(filteredInterest);
          }
        })
        .catch((error) => {
          console.error('Error fetching interests:', error);
        });
    }
  }, [isOpen, backend_url,selectedInterests]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
      setAvailableInterests([...availableInterests, interest]);
    } else {
      setSelectedInterests([...selectedInterests, interest]);
      setAvailableInterests(availableInterests.filter((item) => item !== interest));
    }
  };


  const handleSubmit = () => {
    axios.put(`${backend_url}/api/user/${userId}/interests`, { interests: selectedInterests })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Error updating interests:', error);
      });
  };


  console.log(selectedInterests);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Select Interests"
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-20"
      // overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
    <div className='flex justify-between'>
      <h2 className="text-xl font-semibold mb-4">Select Your Areas of Interest</h2>
      <p className='cursor-pointer text-2xl' onClick={()=>onClose()}>&times;</p>
      </div>
      <div className="mb-4">
        {selectedInterests.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedInterests.map((interest, index) => (
              <div key={index} className="flex items-center bg-blue-600 text-white p-2 rounded-full cursor-pointer font-semibold">
                <p className='ml-2'>{interest}</p>
                <button
                  className="ml-2 text-white"
                  onClick={() => toggleInterest(interest)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-4">Popular Areas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableInterests.map((interest, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-lg cursor-pointer bg-gray-100"
            onClick={() => toggleInterest(interest)}
          >
            <span>{interest}</span>
            <button className="text-xl">
              +
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </Modal>
  );
};

export default InterestModal;
