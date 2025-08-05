import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import AlbumCard from '../components/Common/AlbumCard';
import { mockAlbums, mockTracks, mockPlaylists } from '../data/mockData';
import { useAudio } from '../context/AudioContext';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const { playTrack } = useAudio();
  const greetingRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  console.log(sectionRefs);
  

  useEffect(() => {
    // Greeting animation
    if (greetingRef.current) {
      gsap.fromTo(greetingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const quickPlayItems = mockTracks.slice(0, 6);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-6 pb-32 min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
      {/* Greeting */}
      <div ref={greetingRef} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{getGreeting()}</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back to your music</p>
      </div>

      {/* Quick Play Grid */}
      <div ref={sectionRefs[0]} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Jump back in</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickPlayItems.map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track, mockTracks)}
              className="bg-gray-200 dark:bg-gray-800/50 rounded-lg p-3 flex items-center space-x-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <img
                src={track.coverUrl}
                alt={track.title}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{track.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{track.artist}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-green-500 text-black p-2 rounded-full hover:scale-110 transition-transform">
                  <Play size={16} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Playlists */}
      <div ref={sectionRefs[1]} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-200 dark:bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800/70 transition-colors group">
              <div className="relative mb-4">
                <img
                  src={playlist.coverUrl}
                  alt={playlist.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Play size={20} fill="currentColor" />
                </button>
              </div>
              <h3 className="font-semibold mb-1 truncate">{playlist.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played Albums */}
      <div ref={sectionRefs[2]} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recently played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;