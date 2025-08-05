import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { gsap } from 'gsap';

const Player: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume,
    seekTo
  } = useAudio();

  const [liked, setLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const albumArtRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (currentTrack && playerRef.current) {
      gsap.fromTo(playerRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentTrack]);

  useEffect(() => {
    if (albumArtRef.current) {
      if (isPlaying) {
        gsap.to(albumArtRef.current, {
          rotation: 360,
          duration: 10,
          repeat: -1,
          ease: "none"
        });
      } else {
        gsap.killTweensOf(albumArtRef.current);
      }
    }
  }, [isPlaying]);

  // Animate button when toggled
  const animateButton = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref.current) {
      gsap.fromTo(ref.current, 
        { scale: 1 },
        { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }
  };

  const likeBtnRef = useRef<HTMLButtonElement>(null);
  const shuffleBtnRef = useRef<HTMLButtonElement>(null);
  const repeatBtnRef = useRef<HTMLButtonElement>(null);

  const handleLike = () => {
    setLiked((prev) => !prev);
    animateButton(likeBtnRef);
  };

  const handleShuffle = () => {
    setShuffle((prev) => !prev);
    animateButton(shuffleBtnRef);
  };

  const handleRepeat = () => {
    setRepeat((prev) => !prev);
    animateButton(repeatBtnRef);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      seekTo(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  // Close volume slider when clicking outside (mobile)
  useEffect(() => {
    if (!showVolume) return;
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.volume-control-mobile')) {
        setShowVolume(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showVolume]);

  if (!currentTrack) return null;

  return (
    <div 
      ref={playerRef}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 p-4 z-50"
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto gap-4">
        {/* Current Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0 w-full md:w-auto mb-2 md:mb-0">
          <div className="relative">
            <img
              ref={albumArtRef}
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
            <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
          </div>
          <button
            ref={likeBtnRef}
            onClick={handleLike}
            className={`transition-colors ${liked ? 'text-green-500 scale-110' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart size={20} fill={liked ? "#22c55e" : "none"} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md w-full md:w-auto">
          <div className="flex items-center justify-center space-x-4">
            <button
              ref={shuffleBtnRef}
              onClick={handleShuffle}
              className={`transition-colors ${shuffle ? 'text-green-500 scale-110' : 'text-gray-400 hover:text-white'}`}
            >
              <Shuffle size={20} />
            </button>
            <button 
              onClick={previousTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack size={24} />
            </button>
            <button 
              onClick={isPlaying ? pauseTrack : resumeTrack}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button 
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward size={24} />
            </button>
            <button
              ref={repeatBtnRef}
              onClick={handleRepeat}
              className={`transition-colors ${repeat ? 'text-green-500 scale-110' : 'text-gray-400 hover:text-white'}`}
            >
              <Repeat size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div 
              ref={progressRef}
              onClick={handleProgressClick}
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
            >
              <div 
                className="h-full bg-white rounded-full group-hover:bg-green-500 transition-colors relative"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 flex-1 justify-end w-full md:w-auto">
          {/* Mobile: Volume icon toggles vertical slider */}
          <div className="relative md:hidden volume-control-mobile">
            <button
              onClick={() => setShowVolume((v) => !v)}
              className="p-2"
            >
              <Volume2 size={20} className="text-gray-400" />
            </button>
            {showVolume && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/90 p-2 rounded-lg shadow-lg flex flex-col items-center z-50">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-1 h-24 accent-green-500 rounded-full"
                  style={{  WebkitAppearance: 'slider-vertical' }}
                />
              </div>
            )}
          </div>
          {/* Desktop: Always show horizontal slider */}
          <div className="hidden md:flex items-center space-x-2">
            <Volume2 size={20} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="h-1 w-36 accent-green-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;