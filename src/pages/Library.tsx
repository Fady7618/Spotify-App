import React, { useState, useEffect, useRef } from 'react';
import { ListMusic, Heart, Clock, Grid3X3, List } from 'lucide-react';
import { gsap } from 'gsap';
import TrackItem from '../components/Common/TrackItem';
import AlbumCard from '../components/Common/AlbumCard';
import { mockTracks, mockAlbums, mockPlaylists } from '../data/mockData';

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedTracks] = useState(mockTracks.slice(0, 3)); // Simulate liked tracks
  
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'Recently Played' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
  ];

  return (
    <div className="p-6 pb-32 min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <h1 className="text-3xl font-bold">Your Library</h1>
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                    : 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          >
            <Grid3X3 size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          >
            <List size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Liked Songs */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
              <Heart size={24} className="text-white" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Liked Songs</h3>
              <p className="text-purple-200">{likedTracks.length} songs</p>
            </div>
          </div>

          {/* Recently Played */}
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Recently Played</h3>
              <p className="text-green-200">Your recent music</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef}>
        {activeTab === 'all' && (
          <div className="space-y-8">
            {/* Recently Played Tracks */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recently played tracks</h2>
              <div className="space-y-1">
                {mockTracks.slice(0, 5).map((track, index) => (
                  <TrackItem
                    key={track.id}
                    track={track}
                    index={index}
                    playlist={mockTracks}
                  />
                ))}
              </div>
            </div>

            {/* Recently Played Albums */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recently played albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {mockAlbums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'playlists' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your playlists</h2>
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' : 'space-y-2'}>
              {mockPlaylists.map((playlist) => (
                <div key={playlist.id} className={`cursor-pointer group ${
                  viewMode === 'list' 
                    ? 'flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800/50'
                    : 'bg-gray-200 dark:bg-gray-800/50 p-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800/70 transition-colors'
                }`}>
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.title}
                    className={viewMode === 'list' ? 'w-12 h-12 rounded' : 'w-full aspect-square rounded-lg mb-4'}
                  />
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <h3 className="font-semibold truncate">{playlist.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{playlist.description}</p>
                    {viewMode === 'list' && (
                      <p className="text-gray-400 dark:text-gray-500 text-xs">{playlist.tracks.length} songs</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'albums' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {mockAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'artists' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <div className="bg-gray-200 dark:bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800/70 transition-colors group text-center">
                <div className="relative mb-4">
                  <img
                    src="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="The Weeknd"
                    className="w-full aspect-square object-cover rounded-full shadow-lg"
                  />
                </div>
                <h3 className="font-semibold mb-1 truncate">The Weeknd</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Artist • Following</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;