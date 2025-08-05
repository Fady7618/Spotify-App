import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Heart, Plus, Menu, X } from 'lucide-react';
import { mockPlaylists } from '../../data/mockData';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/80 backdrop-blur-md rounded-full text-white"
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-black text-white p-6 
        transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0'}
        lg:transform-none
      `}>
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          {!isCollapsed && <span className="ml-3 text-xl font-bold">Spotify</span>}
        </div>

        {/* Navigation */}
        <nav className="space-y-4 mb-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center p-3 rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }
              `}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {!isCollapsed && (
          <>
            {/* Create Playlist */}
            <div className="border-t border-gray-800 pt-6 mb-6">
              <button className="flex items-center p-3 text-gray-400 hover:text-white transition-colors duration-200">
                <Plus size={20} />
                <span className="ml-3">Create Playlist</span>
              </button>
              <button className="flex items-center p-3 text-gray-400 hover:text-white transition-colors duration-200">
                <Heart size={20} />
                <span className="ml-3">Liked Songs</span>
              </button>
            </div>

            {/* Playlists */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Recently Created
              </h3>
              {mockPlaylists.map((playlist) => (
                <NavLink
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="block p-2 text-gray-400 hover:text-white transition-colors duration-200 truncate"
                >
                  {playlist.title}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;