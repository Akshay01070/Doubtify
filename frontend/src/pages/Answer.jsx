import React, { useContext, useState, useEffect } from "react";
import Hero from "../components/Hero";
import AnswerCard from "../components/AnswerCard";
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from "../context/userContext";

const Answer = () => {
  const location = useLocation();
  const { questionId } = useParams();
  const stateQuestion = location.state ? location.state.question : null;
  const { backend_url } = useContext(UserContext);
  const [question, setQuestion] = useState(stateQuestion);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // If we have a questionId from URL params but no question from state, fetch it
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!question && questionId) {
        try {
          const response = await axios.get(`${backend_url}/api/question/${questionId}`);
          if (response.data.success) {
            setQuestion(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching question:', error);
        }
      }
    };
    fetchQuestion();
  }, [questionId, backend_url, question]);

  // Fetch answers once we have the question
  useEffect(() => {
    const fetchAnswers = async () => {
      const qId = question ? question._id : questionId;
      if (!qId) return;
      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/api/answer/${qId}`);
        if (response.data.success) {
          setAnswers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching answers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [backend_url, question, questionId]);

  if (!question && !questionId) {
    return <div className="text-center text-gray-400 py-16">Question not found.</div>;
  }

  if (!question) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col max-w-3xl mx-auto'>
      <Hero stopOnClick={true} question={question} />
      <div className="flex flex-col mt-6">
        <h1 className="text-xl font-bold mb-4">
          All Answers ({answers.length})
        </h1>
        <hr className="border-gray-200 mb-4" />
      </div>
      <div className="flex flex-col gap-y-3 pb-8">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : answers.length > 0 ? (
          answers.map((answer) => (
            <AnswerCard answer={answer} key={answer._id} />
          ))
        ) : (
          <div className="text-center text-gray-400 py-12">
            <span className="text-3xl block mb-3">💬</span>
            <p className="font-medium">No answers yet</p>
            <p className="text-sm mt-1">Be the first to answer this question!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Answer;