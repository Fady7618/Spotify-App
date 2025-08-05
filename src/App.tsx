import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Layout/Sidebar';
import TopNav from './components/Layout/TopNav';
import Player from './components/Layout/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Album from './pages/Album';

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Router>
          <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <Sidebar />
            
            <div className="flex-1 flex flex-col lg:ml-0">
              <TopNav />
              
              <main className="flex-1 overflow-auto bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/album/:id" element={<Album />} />
                </Routes>
              </main>
            </div>
            
            <Player />
          </div>
        </Router>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;