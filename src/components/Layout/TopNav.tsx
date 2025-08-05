import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const canGoBack = window.history.length > 1;
  const canGoForward = false; // Simplified for demo

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-transparent to-black/20 backdrop-blur-sm">
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate(-1)}
          disabled={!canGoBack}
          className={`
            p-2 rounded-full transition-all duration-200
            ${canGoBack 
              ? 'bg-black/40 hover:bg-black/60 text-white' 
              : 'bg-black/20 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => navigate(1)}
          disabled={!canGoForward}
          className={`
            p-2 rounded-full transition-all duration-200
            ${canGoForward 
              ? 'bg-black/40 hover:bg-black/60 text-white' 
              : 'bg-black/20 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Page Title */}
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-white">
          {location.pathname === '/' && 'Good evening'}
          {location.pathname === '/search' && 'Search'}
          {location.pathname === '/library' && 'Your Library'}
          {location.pathname.startsWith('/artist') && 'Artist'}
          {location.pathname.startsWith('/album') && 'Album'}
          {location.pathname.startsWith('/playlist') && 'Playlist'}
        </h1>
      </div>

      {/* User Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-200"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-200">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;