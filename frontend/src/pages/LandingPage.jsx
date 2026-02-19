import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';

const LandingPage = () => {
    const { token, user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (token) {
            navigate('/home');
        } else {
            navigate('/signup');
        }
    };

    const getInitials = () => {
        const first = user && user.firstName ? user.firstName[0] : '';
        const last = user && user.lastName ? user.lastName[0] : '';
        return (first + last).toUpperCase() || '?';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="flex items-center justify-between px-6 md:px-12 py-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">D</span>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Doubtify
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    {token ? (
                        <div
                            className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all"
                            onClick={() => navigate('/home')}
                        >
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">Dashboard</span>
                            {user?.profile_picture ? (
                                <img src={user.profile_picture} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{getInitials()}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/signin')}
                                className="px-5 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center px-6 pt-16 pb-20 md:pt-24 md:pb-32">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-bounce">
                    <span>🎓</span> Your Q&A Community
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 max-w-3xl leading-tight">
                    Got a Doubt?
                    <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Get it Resolved.
                    </span>
                </h2>

                <p className="mt-6 text-lg md:text-xl text-gray-500 text-center max-w-2xl leading-relaxed">
                    Ask questions, share knowledge, and learn from a community of students and experts. Bookmark answers, upvote the best responses, and grow together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <button
                        onClick={handleGetStarted}
                        className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
                    >
                        Get Started →
                    </button>
                    <button
                        onClick={() => navigate('/signin')}
                        className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-lg"
                    >
                        I have an account
                    </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-4xl w-full">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">❓</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Ask Questions</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Post your doubts with text, images, and categorize them for better visibility.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">💡</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Get Answers</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Receive answers from the community. Upvote the best ones to help others.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">🔖</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Bookmark & Save</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Save important questions and answers for quick reference later.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-8 text-gray-400 text-sm border-t border-gray-100">
                © 2026 Doubtify. Built for learners, by learners.
            </footer>
        </div>
    );
};

export default LandingPage;
