import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import LeftSidebar from './components/LeftSidebar';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Profile from './pages/Profile';
import Drafts from './pages/Drafts';
import Bookmarks from './pages/Bookmarks';
import Answer from './pages/Answer';
import UserContextProvider from "./context/userContextProvider";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isAuthPage = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <UserContextProvider>
      {!isAuthPage && <NavBar toggleSidebar={toggleSidebar} />}
      <div className={`flex ${!isAuthPage ? 'pt-16' : ''}`}>
        {!isAuthPage && <LeftSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className={`flex-grow transition-all duration-300 ${isAuthPage ? 'w-full' : 'md:ml-56 lg:ml-52 xl:ml-60 p-4'}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/answer/:questionId" element={<Answer />} />
            <Route path="/bookmarks/answer" element={<Answer />} />
            <Route path="/questions/answer" element={<Answer />} />
            <Route path="/home/answer" element={<Answer />} />
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  );
}

function AppContainer() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppContainer;
