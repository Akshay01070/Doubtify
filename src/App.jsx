import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Profile from './pages/Profile';
import Drafts from './pages/Drafts';
import Bookmarks from './pages/Bookmarks';
import Categories from './pages/Categories';
import Answer from './pages/Answer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="flex pt-16">
          <LeftSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`flex-grow p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-36 lg:ml-56 xl:ml-80`}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/drafts" element={<Drafts />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/bookmarks/answer" element={<Answer />} />
              <Route path="/questions/answer" element={<Answer />} />
              <Route path="/home/answer" element={<Answer />} />
            </Routes>
          </div>
          <RightSidebar />
        </div>
      </div>
    </Router>
  );
}

export default App;
