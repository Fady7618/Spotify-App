import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Album } from '../../types';
import { useAudio } from '../../context/AudioContext';
import { gsap } from 'gsap';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const navigate = useNavigate();
  const { playTrack } = useAudio();
  const cardRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current && playButtonRef.current) {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(playButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && playButtonRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(playButtonRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks);
    }
  };

  const handleCardClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="bg-gray-800/50 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/70 group relative"
    >
      <div className="relative mb-4">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        <button
          ref={playButtonRef}
          onClick={handlePlayClick}
          className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 transform translate-y-2 hover:scale-110 transition-all duration-200 shadow-lg"
        >
          <Play size={24} fill="currentColor" />
        </button>
      </div>
      
      <div>
        <h3 className="text-white font-semibold mb-1 truncate">{album.title}</h3>
        <p className="text-gray-400 text-sm truncate">{album.artist}</p>
        <p className="text-gray-500 text-xs mt-1">{album.year}</p>
      </div>
    </div>
  );
};

export default AlbumCard;