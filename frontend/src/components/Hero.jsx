// src/components/Hero.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiMoreHorizontal,
  FiLink,
  FiBookmark,
  FiArrowUp,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AnswerPopup from "./AnswerPopup";
import axios from "axios";
import UserContext from "../context/userContext";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="mt-3 mb-3 h-72 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-100 shadow-inner">
        <img src={images[0]} alt="attachment" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative mt-3 mb-3 group h-72 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-100 shadow-inner">
      <img
        src={images[currentIndex]}
        alt={`Attachment ${currentIndex + 1}`}
        className="h-full w-full object-cover transition-opacity duration-300"
      />
      {/* Left Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100"
      >
        <FiChevronLeft size={18} />
      </button>
      {/* Right Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100"
      >
        <FiChevronRight size={18} />
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-blue-500 w-4' : 'bg-white/70 shadow-sm'}`}
          />
        ))}
      </div>
      <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
        {currentIndex + 1}/{images.length}
      </span>
    </div>
  );
};

const Hero = ({ stopOnClick, question, onUnbookmark }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [upvotes, setUpvotes] = useState(question.upvotes || 0);
  const [answerCount, setAnswerCount] = useState(0);
  const navigate = useNavigate();
  const { backend_url, user: currentUser } = useContext(UserContext);
  const [questionUser, setQuestionUser] = useState(null);
  const [isUpvote, setIsUpvote] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const userId = question.userId;

  useEffect(() => {
    if (userId) {
      axios.post(`${backend_url}/api/user/otheruserInfo`, { userId })
        .then(res => { if (res.data.success) setQuestionUser(res.data.user); })
        .catch(err => console.error(err));
    }

    if (currentUser && currentUser._id) {
      axios.post(`${backend_url}/api/question/upvoteStatus`, {
        questionId: question._id,
        userId: currentUser._id
      })
        .then(res => { if (res.data.success) setIsUpvote(res.data.isUpvoted); })
        .catch(err => console.error(err));

      axios.post(`${backend_url}/api/bookmark/status`, {
        userId: currentUser._id,
        questionId: question._id
      })
        .then(res => { if (res.data.success) setIsBookmarked(res.data.isBookmarked); })
        .catch(err => console.error(err));
    }

    axios.get(`${backend_url}/api/answer/count/${question._id}`)
      .then(res => { if (res.data.success) setAnswerCount(res.data.count); })
      .catch(err => console.error(err));

  }, [backend_url, question._id, userId, currentUser._id]);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleAnswerClick = (e) => {
    e.stopPropagation();
    setShowAnswerPopup(true);
  };

  const closeAnswerPopup = () => {
    setShowAnswerPopup(false);
  };

  const handleComponentClick = (e) => {
    if (stopOnClick) return;
    e.stopPropagation();
    navigate(`/answer/${question._id}`);
  };

  const handleUpvotes = async (e) => {
    e.stopPropagation();
    if (!currentUser || !currentUser._id) return;
    setIsUpvote(prev => !prev);
    setUpvotes(prev => isUpvote ? prev - 1 : prev + 1);
    try {
      const response = await axios.post(`${backend_url}/api/question/upvote`, {
        questionId: question._id,
        userId: currentUser._id
      });
      if (response.data.success && response.data.question) {
        setUpvotes(response.data.question.upvotes);
      }
    } catch (error) {
      console.error("Error updating upvotes:", error);
      setIsUpvote(prev => !prev);
      setUpvotes(prev => isUpvote ? prev + 1 : prev - 1);
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (!currentUser || !currentUser._id) return;
    try {
      const response = await axios.post(`${backend_url}/api/bookmark/toggle`, {
        userId: currentUser._id,
        questionId: question._id
      });
      if (response.data.success) {
        setIsBookmarked(response.data.bookmarked);
        if (!response.data.bookmarked && onUnbookmark) {
          onUnbookmark(question._id);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
    setShowOptions(false);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const link = `${window.location.origin}/answer/${question._id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowOptions(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getInitials = () => {
    if (!questionUser) return '??';
    const first = questionUser.firstName ? questionUser.firstName[0] : '';
    const last = questionUser.lastName ? questionUser.lastName[0] : '';
    return (first + last).toUpperCase();
  };

  if (hidden) return null;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow w-full my-3 relative border border-gray-100">
      <button className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 transition-colors" onClick={(e) => { e.stopPropagation(); setHidden(true); }}>
        <FiX size={18} />
      </button>

      <div className="cursor-pointer" onClick={handleComponentClick}>
        {/* User info header */}
        <div className="flex items-center mb-3">
          {questionUser && questionUser.profile_picture ? (
            <img src={questionUser.profile_picture} alt="" className="w-10 h-10 rounded-full mr-3 object-cover ring-2 ring-gray-100" />
          ) : (
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full w-10 h-10 flex items-center justify-center mr-3 ring-2 ring-blue-50">
              <span className="text-white text-sm font-bold">{getInitials()}</span>
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900">
              {questionUser ? `${questionUser.firstName} ${questionUser.lastName}` : '...'}
            </h2>
            <p className="text-xs text-gray-400">
              {formatDate(question.createdAt)}
              {questionUser && questionUser.bio ? ` · ${questionUser.bio.substring(0, 50)}` : ''}
            </p>
          </div>
        </div>

        {/* Question body */}
        <h3 className="text-base font-medium text-gray-800 mb-2 leading-relaxed">{question.body}</h3>

        {/* Image Carousel */}
        <ImageCarousel images={question.files} />

        {/* Category badge */}
        {question.categories && (
          <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium mb-2">
            {question.categories}
          </span>
        )}

        {/* Answer count */}
        <p className="text-xs text-gray-400 mb-3 hover:text-blue-500 transition-colors">
          {answerCount} Answer{answerCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={handleAnswerClick}
            className="text-blue-600 px-4 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            Answer
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isUpvote
              ? 'bg-green-500 text-white shadow-sm'
              : 'text-green-600 bg-green-50 hover:bg-green-100'
              }`}
            onClick={handleUpvotes}
          >
            <FiArrowUp size={14} />{upvotes}
          </button>
        </div>
        <div className="relative">
          {copied && (
            <span className="absolute -top-8 right-0 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow">
              Copied!
            </span>
          )}
          <button onClick={handleMoreClick} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <FiMoreHorizontal size={18} />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden">
              <button className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap w-full transition-colors" onClick={handleCopyLink}>
                <FiLink className="mr-2" size={14} /> Copy Link
              </button>
              <button
                className={`flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 whitespace-nowrap w-full transition-colors ${isBookmarked ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={handleBookmark}
              >
                <FiBookmark className={`mr-2 ${isBookmarked ? 'fill-current' : ''}`} size={14} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          )}
        </div>
      </div>

      {showAnswerPopup && <AnswerPopup onClose={closeAnswerPopup} question={question} />}
    </div>
  );
};

export default Hero;