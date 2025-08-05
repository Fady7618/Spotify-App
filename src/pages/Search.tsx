import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { gsap } from 'gsap';
import TrackItem from '../components/Common/TrackItem';
import AlbumCard from '../components/Common/AlbumCard';
import { mockTracks, mockAlbums, mockArtists } from '../data/mockData';
import { Track, Album, Artist } from '../types';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
      gsap.fromTo(searchRef.current.parentElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        const searchTerm = query.toLowerCase();
        
        const tracks = mockTracks.filter(track =>
          track.title.toLowerCase().includes(searchTerm) ||
          track.artist.toLowerCase().includes(searchTerm) ||
          track.album.toLowerCase().includes(searchTerm)
        );
        
        const albums = mockAlbums.filter(album =>
          album.title.toLowerCase().includes(searchTerm) ||
          album.artist.toLowerCase().includes(searchTerm)
        );
        
        const artists = mockArtists.filter(artist =>
          artist.name.toLowerCase().includes(searchTerm)
        );

        setFilteredTracks(tracks);
        setFilteredAlbums(albums);
        setFilteredArtists(artists);
        
        // Animate results entrance
        if (resultsRef.current) {
          gsap.fromTo(resultsRef.current.children,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6, 
              stagger: 0.1,
              ease: "power2.out"
            }
          );
        }
      } else {
        setFilteredTracks([]);
        setFilteredAlbums([]);
        setFilteredArtists([]);
      }
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const genres = [
    { name: 'Pop', color: 'bg-red-500', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Hip Hop', color: 'bg-purple-500', image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Rock', color: 'bg-orange-500', image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'R&B', color: 'bg-green-500', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Electronic', color: 'bg-blue-500', image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Jazz', color: 'bg-yellow-500', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  return (
    <div className="p-6 pb-32 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            ref={searchRef}
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-full border-none outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Search Results */}
      {query && (
        <div ref={resultsRef} className="space-y-8">
          {/* Top Result */}
          {(filteredTracks.length > 0 || filteredAlbums.length > 0 || filteredArtists.length > 0) && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>
              <div className="bg-gray-800/50 rounded-lg p-6 max-w-sm cursor-pointer hover:bg-gray-800/70 transition-colors">
                {filteredTracks[0] && (
                  <div className="flex items-center space-x-4">
                    <img
                      src={filteredTracks[0].coverUrl}
                      alt={filteredTracks[0].title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">{filteredTracks[0].title}</h3>
                      <p className="text-gray-400">{filteredTracks[0].artist}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-gray-700 text-white text-xs rounded-full">
                        Song
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Songs */}
          {filteredTracks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
              <div className="space-y-1">
                {filteredTracks.slice(0, 5).map((track, index) => (
                  <TrackItem
                    key={track.id}
                    track={track}
                    index={index}
                    playlist={filteredTracks}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Albums */}
          {filteredAlbums.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredAlbums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </div>
          )}

          {/* Artists */}
          {filteredArtists.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredArtists.map((artist) => (
                  <div key={artist.id} className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-800/70 transition-colors group text-center">
                    <div className="relative mb-4">
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-full shadow-lg"
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-1 truncate">{artist.name}</h3>
                    <p className="text-gray-400 text-sm">Artist</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!isSearching && query && filteredTracks.length === 0 && filteredAlbums.length === 0 && filteredArtists.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-2">No results found for "{query}"</h2>
              <p className="text-gray-400">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
            </div>
          )}
        </div>
      )}

      {/* Browse Categories */}
      {!query && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {genres.map((genre) => (
              <div
                key={genre.name}
                className={`${genre.color} rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden h-32`}
              >
                <h3 className="text-white font-bold text-xl mb-2">{genre.name}</h3>
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="absolute bottom-0 right-0 w-20 h-20 object-cover rounded transform rotate-12 translate-x-2 translate-y-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;