import React, { useRef } from 'react';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { Track } from '../../types';
import { useAudio } from '../../context/AudioContext';
import { gsap } from 'gsap';

interface TrackItemProps {
  track: Track;
  index: number;
  playlist?: Track[];
  showAlbum?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, index, playlist, showAlbum = true }) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const trackRef = useRef<HTMLDivElement>(null);
  
  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlay = () => {
    if (isCurrentlyPlaying) {
      pauseTrack();
    } else {
      playTrack(track, playlist);
    }
  };

  const handleMouseEnter = () => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        backgroundColor: 'rgb(255, 255, 255, 0.1)',
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (trackRef.current && !isCurrentTrack) {
      gsap.to(trackRef.current, {
        backgroundColor: 'transparent',
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={trackRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        grid grid-cols-[16px_1fr_1fr_1fr_50px] gap-4 p-2 rounded-md group cursor-pointer
        ${isCurrentTrack ? 'bg-white/10' : ''}
      `}
      onClick={handlePlay}
    >
      {/* Track Number / Play Button */}
      <div className="flex items-center justify-center">
        <span className={`text-sm group-hover:hidden ${isCurrentTrack ? 'text-green-500' : 'text-gray-400'}`}>
          {index + 1}
        </span>
        <button className="hidden group-hover:block text-white hover:scale-110 transition-transform">
          {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex items-center space-x-3 min-w-0">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="w-10 h-10 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className={`font-medium truncate ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
            {track.title}
          </p>
          <p className="text-sm text-gray-400 truncate">{track.artist}</p>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <div className="flex items-center">
          <p className="text-sm text-gray-400 truncate">{track.album}</p>
        </div>
      )}

      {/* Duration */}
      <div className="flex items-center justify-end">
        <span className="text-sm text-gray-400 group-hover:hidden">
          {formatDuration(track.duration)}
        </span>
        <button className="hidden group-hover:block text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrackItem;