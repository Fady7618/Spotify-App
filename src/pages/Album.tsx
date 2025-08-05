import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import TrackItem from '../components/Common/TrackItem';
import { mockAlbums } from '../data/mockData';
import { useAudio } from '../context/AudioContext';

const Album: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  
  const headerRef = useRef<HTMLDivElement>(null);
  const tracklistRef = useRef<HTMLDivElement>(null);
  
  const album = mockAlbums.find(a => a.id === id);
  
  if (!album) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-white">Album not found</h1>
      </div>
    );
  }

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
    
    if (tracklistRef.current) {
      gsap.fromTo(tracklistRef.current.children,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const isAlbumPlaying = album.tracks.some(track => 
    currentTrack?.id === track.id && isPlaying
  );

  const handlePlayAlbum = () => {
    if (isAlbumPlaying) {
      pauseTrack();
    } else {
      playTrack(album.tracks[0], album.tracks);
    }
  };

  const totalDuration = album.tracks.reduce((total, track) => total + track.duration, 0);
  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen pb-32">
      {/* Album Header */}
      <div ref={headerRef} className="flex items-end space-x-6 p-6 bg-gradient-to-b from-gray-700 to-gray-900">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-56 h-56 rounded-lg shadow-2xl"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-white mb-2">ALBUM</p>
          <h1 className="text-5xl font-bold text-white mb-4">{album.title}</h1>
          <div className="flex items-center space-x-2 text-gray-300">
            <img
              src="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=50"
              alt={album.artist}
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium">{album.artist}</span>
            <span>•</span>
            <span>{album.year}</span>
            <span>•</span>
            <span>{album.tracks.length} songs</span>
            <span>•</span>
            <span>{formatTotalDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6 p-6">
        <button
          onClick={handlePlayAlbum}
          className="bg-green-500 text-black p-4 rounded-full hover:scale-105 hover:bg-green-400 transition-all duration-200 shadow-lg"
        >
          {isAlbumPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Heart size={32} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={32} />
        </button>
      </div>

      {/* Track List */}
      <div className="px-6">
        {/* Track List Header */}
        <div className="grid grid-cols-[16px_1fr_1fr_50px] gap-4 px-2 py-2 border-b border-gray-700 mb-2">
          <div className="text-gray-400 text-sm">#</div>
          <div className="text-gray-400 text-sm">TITLE</div>
          <div className="text-gray-400 text-sm">ALBUM</div>
          <div className="text-gray-400 text-sm flex justify-end">
            <Clock size={16} />
          </div>
        </div>

        {/* Tracks */}
        <div ref={tracklistRef} className="space-y-1">
          {album.tracks.map((track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              index={index}
              playlist={album.tracks}
              showAlbum={false}
            />
          ))}
        </div>
      </div>

      {/* Album Info */}
      <div className="p-6 mt-8">
        <div className="text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-400 mb-2">{album.year}</p>
          <p>
            Experience the artistry of {album.artist} with this incredible {album.genre.toLowerCase()} album. 
            Each track tells a story, creating a cohesive musical journey that showcases the artist's 
            evolution and creativity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Album;